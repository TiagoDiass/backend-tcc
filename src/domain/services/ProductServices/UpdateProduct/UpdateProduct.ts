import Product from 'domain/entities/Product/Product';
import IProductRepository from 'domain/ports/ProductRepository';
import { IRequestUpdateProductDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class UpdateProduct {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(updateProductDTO: IRequestUpdateProductDTO): Promise<DomainServiceResult<Product>> {
    try {
      const { data: productExists } = await this.productRepository.findById(updateProductDTO.id);

      if (!productExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum produto cadastrado com o ID informado',
          },
        };
      }

      const updatedProduct = new Product(updateProductDTO);

      const repoResult = await this.productRepository.update(updatedProduct);

      return {
        status: 200,
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
