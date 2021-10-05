import Product from 'domain/entities/Product/Product';
import IProductRepository from 'domain/ports/ProductRepository';
import { IRequestCreateProductDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class CreateProduct {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(
    createProductDTO: IRequestCreateProductDTO
  ): Promise<DomainServiceResult<Product>> {
    try {
      const product = new Product(createProductDTO);

      const repoResult = await this.productRepository.save(product);

      return {
        status: 201,
        result: repoResult.data,
      };
    } catch (error: any) {
      const isInvalidProductError = error.type === 'invalid-product-error';

      return {
        status: isInvalidProductError ? 400 : 500,
        error: {
          message: error.message,
          errorsList: isInvalidProductError ? error.errorsList : [],
        },
      };
    }
  }
}
