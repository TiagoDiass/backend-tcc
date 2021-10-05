import Product from 'domain/entities/Product/Product';
import IProductRepository from 'domain/ports/ProductRepository';
import { DomainServiceResult } from 'domain/services/types';

export default class ListProducts {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(): Promise<DomainServiceResult<Product[]>> {
    try {
      const repoResult = await this.productRepository.list();

      return {
        status: 200,
        result: repoResult.data,
      };
    } catch (error: any) {
      return {
        status: 500,
        error: {
          message: error.message,
        },
      };
    }
  }
}
