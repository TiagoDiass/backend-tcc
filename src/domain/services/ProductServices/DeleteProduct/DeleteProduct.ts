import Product from 'domain/entities/Product/Product';
import IProductRepository from 'domain/ports/ProductRepository';
import { IRequestDeleteProductDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class DeleteProduct {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    deleteProductDTO: IRequestDeleteProductDTO
  ): Promise<DomainServiceResult<Product['id']>> {
    try {
      const { data: productExists } = await this.productRepository.findById(deleteProductDTO.id);

      if (!productExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum produto cadastrado com o ID informado',
          },
        };
      }

      const repoResult = await this.productRepository.delete(deleteProductDTO.id);

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
