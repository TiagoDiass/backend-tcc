import Product from 'domain/entities/Product/Product';
import IProductRepository from 'domain/ports/ProductRepository';
import { IRequestGetProductByIdDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class GetProductById {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(
    getProductByIdDTO: IRequestGetProductByIdDTO
  ): Promise<DomainServiceResult<Product>> {
    try {
      const { data: product } = await this.productRepository.findById(getProductByIdDTO.id);

      if (!product) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum produto cadastrado com o ID informado',
          },
        };
      }

      return {
        status: 200,
        result: product,
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
