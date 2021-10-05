import CreateProduct from './CreateProduct';
import { IRequestCreateProductDTO } from 'domain/services/dto';
import { mockTransactionRepository } from '@testUtils/transactionsMocks';
import IProductRepository from 'domain/ports/ProductRepository';
import { mockProductRepository } from '@testUtils/productsMocks';

const UUID_MOCK = '1e16f407-1cef-427c-af39-e9c3efcbd18e';

jest.mock('uuid', () => ({
  v4: jest.fn().mockImplementation(() => UUID_MOCK),
}));

describe('Service: CreateProduct', () => {
  it('should call productRepository.save() and return correctly', async () => {
    const productRepositoryMock: IProductRepository = {
      ...mockProductRepository(),

      save: jest.fn().mockImplementationOnce(product => ({
        data: product,
      })),
    };

    const createProduct = new CreateProduct(productRepositoryMock);

    const createProductDTO: IRequestCreateProductDTO = {
      name: 'nome do produto',
    };

    const response = await createProduct.execute(createProductDTO);

    expect(productRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.save).toHaveBeenCalledWith({
      id: UUID_MOCK,
      name: 'nome do produto',
      description: '',
    });

    expect(response).toEqual({
      status: 201,
      result: {
        id: UUID_MOCK,
        name: 'nome do produto',
        description: '',
      },
    });
  });

  it('should return correctly if Product entity throws an exception', async () => {
    const productRepositoryMock = mockProductRepository();

    const createProduct = new CreateProduct(productRepositoryMock);

    const createTransactionDTO: IRequestCreateProductDTO = {
      name: '123', // invalid name, it has to have at least 4 characters
    };

    const response = await createProduct.execute(createTransactionDTO);

    expect(productRepositoryMock.save).not.toHaveBeenCalled();

    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Produto inválido',
        errorsList: ['nome do produto deve conter pelo menos 4 caracteres'],
      },
    });
  });

  it('should return correctly if ProductRepository throws an exception', async () => {
    const productRepositoryMock: IProductRepository = {
      ...mockProductRepository(),

      save: jest.fn().mockImplementationOnce(() => {
        throw new Error('Erro mockado');
      }),
    };

    const createProduct = new CreateProduct(productRepositoryMock);

    const createTransactionDTO: IRequestCreateProductDTO = {
      name: 'nome do produto',
    };

    const response = await createProduct.execute(createTransactionDTO);

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
