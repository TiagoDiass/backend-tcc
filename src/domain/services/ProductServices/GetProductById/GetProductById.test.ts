import GetProductById from './GetProductById';
import {
  mockGetProductByIdDTO,
  mockProduct,
  mockProductRepository,
} from '@testUtils/productsMocks';
import IProductRepository from 'domain/ports/ProductRepository';

describe('Service: GetProductById', () => {
  it('should return correctly if product has been found', async () => {
    const getProductByIdDTO = mockGetProductByIdDTO();
    const productToBeReturned = mockProduct();

    const productRepositoryMock: IProductRepository = {
      ...mockProductRepository(),
      findById: jest.fn().mockResolvedValue({ data: productToBeReturned }),
    };

    const getProductById = new GetProductById(productRepositoryMock);
    const response = await getProductById.execute(getProductByIdDTO);

    expect(productRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.findById).toHaveBeenCalledWith(getProductByIdDTO.id);
    expect(response).toEqual({
      status: 200,
      result: productToBeReturned,
    });
  });

  it('should return correctly if product has not been found', async () => {
    const getProductByIdDTO = mockGetProductByIdDTO();

    const productRepositoryMock: IProductRepository = {
      ...mockProductRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const getProductById = new GetProductById(productRepositoryMock);
    const response = await getProductById.execute(getProductByIdDTO);

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum produto cadastrado com o ID informado',
      },
    });
  });

  it('should return correctly if ProductRepository throws an exception', async () => {
    const productRepositoryMock: IProductRepository = {
      ...mockProductRepository(),
      findById: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const getProductById = new GetProductById(productRepositoryMock);
    const response = await getProductById.execute(mockGetProductByIdDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
