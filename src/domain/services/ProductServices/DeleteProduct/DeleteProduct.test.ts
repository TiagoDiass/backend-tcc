import DeleteProduct from './DeleteProduct';
import { mockDeleteProductDTO, mockProduct, mockProductRepository } from '@testUtils/productsMocks';
import IProductRepository from 'domain/ports/ProductRepository';

describe('Service: DeleteProduct', () => {
  it('should return correctly if product has been deleted successfully', async () => {
    const deleteProductDTO = mockDeleteProductDTO();

    const productRepositoryMock: IProductRepository = {
      ...mockProductRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockProduct() }),
      delete: jest.fn().mockResolvedValue({ data: deleteProductDTO.id }),
    };

    const deleteProduct = new DeleteProduct(productRepositoryMock);

    const response = await deleteProduct.execute(deleteProductDTO);

    expect(productRepositoryMock.delete).toHaveBeenCalledWith(deleteProductDTO.id);

    expect(response).toEqual({
      status: 200,
      result: deleteProductDTO.id,
    });
  });

  it('should return correctly if there is no product with the received id', async () => {
    const productRepositoryMock: IProductRepository = {
      ...mockProductRepository(),
      findById: jest.fn().mockResolvedValue({ status: 404, data: null }),
    };

    const deleteProduct = new DeleteProduct(productRepositoryMock);

    const deleteProductDTO = mockDeleteProductDTO();

    const response = await deleteProduct.execute(deleteProductDTO);

    expect(productRepositoryMock.findById).toHaveBeenCalledWith(deleteProductDTO.id);

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

    const deleteProduct = new DeleteProduct(productRepositoryMock);

    const response = await deleteProduct.execute(mockDeleteProductDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
