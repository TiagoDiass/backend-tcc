import Product from 'domain/entities/Product/Product';
import IRepositoryMethodResult from './RepositoryMethodResult';

export default interface IProductRepository {
  save(product: Product): Promise<IRepositoryMethodResult<Product>>;
  list(): Promise<IRepositoryMethodResult<Product[]>>;
  findById(id: string): Promise<IRepositoryMethodResult<Product | null>>;
  delete(id: string): Promise<IRepositoryMethodResult<Product['id']>>;
  update(product: Product): Promise<IRepositoryMethodResult<Product>>;
}
