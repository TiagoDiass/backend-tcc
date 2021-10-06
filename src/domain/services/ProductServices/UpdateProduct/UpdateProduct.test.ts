import UpdateProduct from './UpdateProduct';
import Product from 'domain/entities/Product/Product';
import IProductRepository from 'domain/ports/ProductRepository';
import { mockProduct, mockProductRepository, mockUpdateProductDTO } from '@testUtils/productsMocks';
import { IRequestUpdateProductDTO } from 'domain/services/dto';

describe('Service: UpdateProduct', () => {
  it('should return correctly if product was found and successfully updated', async () => {
    const updateProductDTO = mockUpdateProductDTO();
    const notUpdatedProduct = new Product({
      ...mockProduct(),
      id: updateProductDTO.id,
    });
    const updatedProduct = new Product(updateProductDTO);

    const productRepositoryMock: IProductRepository = {
      ...mockProductRepository(),
      findById: jest.fn().mockResolvedValue({ data: notUpdatedProduct }),
      update: jest.fn().mockResolvedValue({ data: updatedProduct }),
    };

    const updateProduct = new UpdateProduct(productRepositoryMock);

    const response = await updateProduct.execute(updateProductDTO);

    expect(productRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.findById).toHaveBeenCalledWith(updateProductDTO.id);
    expect(productRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.update).toHaveBeenCalledWith(updatedProduct);

    expect(response).toEqual({
      status: 200,
      result: updatedProduct,
    });
  });

  it('should return correctly if product has not been found', async () => {
    const updateProductDTO = mockUpdateProductDTO();

    const productRepositoryMock: IProductRepository = {
      ...mockProductRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const updateProduct = new UpdateProduct(productRepositoryMock);

    const response = await updateProduct.execute(updateProductDTO);

    expect(productRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.findById).toHaveBeenCalledWith(updateProductDTO.id);
    expect(productRepositoryMock.update).not.toHaveBeenCalled();

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum produto cadastrado com o ID informado',
      },
    });
  });

  it('should return correctly if Product entity throws an exception', async () => {
    const updateProductDTO: IRequestUpdateProductDTO = {
      ...mockUpdateProductDTO(),
      name: '12', // invalid name, it should have at least 4 characters
    };

    const productRepositoryMock: IProductRepository = {
      ...mockProductRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockProduct() }),
    };

    const updateProduct = new UpdateProduct(productRepositoryMock);

    const response = await updateProduct.execute(updateProductDTO);

    expect(productRepositoryMock.update).not.toHaveBeenCalled();
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
      findById: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const updateProduct = new UpdateProduct(productRepositoryMock);

    const response = await updateProduct.execute(mockUpdateProductDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
