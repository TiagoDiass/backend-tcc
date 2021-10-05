import ListProducts from './ListProducts';
import IProductRepository from 'domain/ports/ProductRepository';
import { mockProduct, mockProductRepository } from '@testUtils/productsMocks';

describe('Service: ListAnimals', () => {
  it('should call productRepository.list() and return correctly', async () => {
    const productsToBeReturned = [mockProduct(), mockProduct()];

    const productRepositoryMock: IProductRepository = {
      ...mockProductRepository(),

      list: jest.fn().mockResolvedValue({
        data: productsToBeReturned,
      }),
    };

    const listProducts = new ListProducts(productRepositoryMock);

    const response = await listProducts.execute();

    expect(productRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 200,
      result: productsToBeReturned,
    });
  });

  it('should return correctly if ProductRepository throws an exception', async () => {
    const productRepositoryMock: IProductRepository = {
      ...mockProductRepository(),

      list: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const listProducts = new ListProducts(productRepositoryMock);

    const response = await listProducts.execute();

    expect(productRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 500,
      error: { message: 'Erro mockado' },
    });
  });
});
