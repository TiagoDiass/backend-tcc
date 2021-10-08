import IProductRepository from 'domain/ports/ProductRepository';
import {
  IRequestGetProductByIdDTO,
  IRequestUpdateProductDTO,
  IRequestDeleteProductDTO,
  IRequestCreateProductDTO,
} from 'domain/services/dto';
import {
  CreateProduct,
  DeleteProduct,
  GetProductById,
  ListProducts,
  UpdateProduct,
} from 'domain/services/ProductServices';

export default class ProductController {
  constructor(private readonly productRepository: IProductRepository) {}

  async listProducts(): Promise<ControllerMethodResult> {
    const listProductsService = new ListProducts(this.productRepository);

    try {
      const listProductsResponse = await listProductsService.execute();

      return {
        status: listProductsResponse.status,
        result: {
          message:
            listProductsResponse.status === 200
              ? 'Lista de produtos obtida com sucesso'
              : listProductsResponse.error?.message,
          data: listProductsResponse.status === 200 ? listProductsResponse.result : [],
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao listar produtos: ${error.message || 'Erro sem mensagem...'}`,
        },
      };
    }
  }

  async createProduct(createProductDTO: IRequestCreateProductDTO): Promise<ControllerMethodResult> {
    const createProductService = new CreateProduct(this.productRepository);

    try {
      const createProductResponse = await createProductService.execute(createProductDTO);

      const response: ControllerMethodResult = {
        status: createProductResponse.status,
        result: {
          message:
            createProductResponse.status === 201
              ? 'Produto cadastrado com sucesso'
              : createProductResponse.error?.message,

          data: createProductResponse.result || null,
        },
      };

      if (createProductResponse.status !== 201) {
        response.result.errors = createProductResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar o cadastro de um produto: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async deleteProduct(deleteProductDTO: IRequestDeleteProductDTO): Promise<ControllerMethodResult> {
    const deleteProductService = new DeleteProduct(this.productRepository);

    try {
      const deleteProductResult = await deleteProductService.execute(deleteProductDTO);

      return {
        status: deleteProductResult.status,
        result: {
          message:
            deleteProductResult.status === 200
              ? 'Produto excluído com sucesso'
              : deleteProductResult.error?.message,

          data: deleteProductResult.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao excluir produto: ${error.message || 'Erro sem mensagem...'}`,
        },
      };
    }
  }

  async getProductById(
    getProductByIdDTO: IRequestGetProductByIdDTO
  ): Promise<ControllerMethodResult> {
    const getProductById = new GetProductById(this.productRepository);

    try {
      const getProductByIdResult = await getProductById.execute(getProductByIdDTO);

      return {
        status: getProductByIdResult.status,
        result: {
          message:
            getProductByIdResult.status === 200
              ? 'Produto obtido com sucesso'
              : getProductByIdResult.error?.message,
          data: getProductByIdResult.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao obter produto: ${error.message || 'Erro sem mensagem...'}`,
        },
      };
    }
  }

  async updateProduct(updateProductDTO: IRequestUpdateProductDTO): Promise<ControllerMethodResult> {
    const updateProductService = new UpdateProduct(this.productRepository);

    try {
      const updateProductResponse = await updateProductService.execute(updateProductDTO);

      const response: ControllerMethodResult = {
        status: updateProductResponse.status,
        result: {
          message:
            updateProductResponse.status === 200
              ? 'Produto atualizado com sucesso'
              : updateProductResponse.error?.message,

          data: updateProductResponse.result || null,
        },
      };

      if (![200, 404].includes(updateProductResponse.status)) {
        response.result.errors = updateProductResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar a atualização de um produto: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }
}
