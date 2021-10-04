import Product from 'domain/entities/Product/Product';
import IProductRepository from 'domain/ports/ProductRepository';
import {
  IRequestCreateProductDTO,
  IRequestDeleteProductDTO,
  IRequestUpdateProductDTO,
  IRequestGetProductByIdDTO,
} from 'domain/services/dto';
import faker from 'faker';

export const mockProductRepository = (): IProductRepository => ({
  list: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

export const mockProduct = (): Product =>
  new Product({
    name: faker.random.words(2),
    description: faker.random.words(7),
  });

export const mockCreateProductDTO = (): IRequestCreateProductDTO => ({
  name: faker.random.words(2),
  description: faker.random.words(7),
});

export const mockDeleteProductDTO = (): IRequestDeleteProductDTO => ({
  id: faker.datatype.uuid(),
});

export const mockGetProductByIdDTO = (): IRequestGetProductByIdDTO => ({
  id: faker.datatype.uuid(),
});

export const mockUpdateProductDTO = (): IRequestUpdateProductDTO => ({
  id: faker.datatype.uuid(),
  name: faker.random.words(2),
  description: faker.random.words(7),
});
