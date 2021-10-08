import ProductController from './ProductController';

import {
  mockCreateProductDTO,
  mockDeleteProductDTO,
  mockGetProductByIdDTO,
  mockUpdateProductDTO,
  mockProduct,
  mockProductRepository,
} from '@testUtils/productsMocks';

const makeSut = () => {
  const productRepositoryMock = mockProductRepository();
  const productController = new ProductController(productRepositoryMock);

  return { productController };
};

// ListProducts mock
const productsToBeReturned = [mockProduct(), mockProduct()];

const mockListProductsExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: productsToBeReturned })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/ProductServices/ListProducts/ListProducts', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockListProductsExecute,
  }));
});

// CreateProduct mock
const createdProductMock = mockProduct();
const errorCreateProductMock = {
  message: 'Erro ao criar produto',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
} as const;
const mockCreateProductExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 201, result: createdProductMock })
  .mockResolvedValueOnce({ status: 400, error: errorCreateProductMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/ProductServices/CreateProduct/CreateProduct', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockCreateProductExecute,
  }));
});

// DeleteProduct mock
const deletedProductMock = mockProduct();
const errorDeleteProductMock = {
  message: 'Produto não encontrado',
} as const;
const mockDeleteProductExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: deletedProductMock.id })
  .mockResolvedValueOnce({ status: 404, error: errorDeleteProductMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/ProductServices/DeleteProduct/DeleteProduct', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockDeleteProductExecute,
  }));
});

// GetProductById mock
const foundProductMock = mockProduct();
const errorGetProductByIdMock = {
  message: 'Produto não encontrado',
} as const;
const mockGetProductByIdExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: foundProductMock })
  .mockResolvedValueOnce({ status: 404, error: errorGetProductByIdMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/ProductServices/GetProductById/GetProductById', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockGetProductByIdExecute,
  }));
});

// UpdateProduct mock
const updatedProductMock = mockProduct();
const errorUpdateProductMock = {
  message: 'Erro ao atualizar produto',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
} as const;
const mockUpdateProductExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: updatedProductMock })
  .mockResolvedValueOnce({ status: 400, error: errorUpdateProductMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/ProductServices/UpdateProduct/UpdateProduct', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockUpdateProductExecute,
  }));
});

describe('Controller: ProductController', () => {
  describe('method: listProducts', () => {
    it('should return correctly (list successfully)', async () => {
      const { productController } = makeSut();

      const response = await productController.listProducts();

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Lista de produtos obtida com sucesso',
          data: productsToBeReturned,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { productController } = makeSut();

      const response = await productController.listProducts();

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao listar produtos: Erro mockado',
        },
      });
    });
  });

  describe('method: createProduct', () => {
    it('should return correctly (created successfully)', async () => {
      const { productController } = makeSut();

      const response = await productController.createProduct(mockCreateProductDTO());

      expect(response).toEqual({
        status: 201,
        result: {
          message: 'Produto cadastrado com sucesso',
          data: createdProductMock,
        },
      });
    });

    it('should return correctly (not created, invalid fields)', async () => {
      const { productController } = makeSut();

      const response = await productController.createProduct(
        mockCreateProductDTO() // correct data, but the service has been mocked to return error
      );

      expect(response).toEqual({
        status: 400,
        result: {
          message: errorCreateProductMock.message,
          errors: errorCreateProductMock.errorsList,
          data: null,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { productController } = makeSut();

      const response = await productController.createProduct(mockCreateProductDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao executar o cadastro de um produto: Erro mockado',
        },
      });
    });
  });

  describe('method: deleteProduct', () => {
    it('should return correctly (successfully deleted)', async () => {
      const { productController } = makeSut();

      const response = await productController.deleteProduct({
        id: deletedProductMock.id,
      });

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Produto excluído com sucesso',
          data: deletedProductMock.id,
        },
      });
    });

    it('should return correctly (product not found)', async () => {
      const { productController } = makeSut();

      const response = await productController.deleteProduct(mockDeleteProductDTO());

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorDeleteProductMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exceptions occurs', async () => {
      const { productController } = makeSut();

      const response = await productController.deleteProduct(mockDeleteProductDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao excluir produto: Erro mockado',
        },
      });
    });
  });

  describe('getProductById method', () => {
    it('should return correctly (product successfully found)', async () => {
      const { productController } = makeSut();

      const response = await productController.getProductById(mockGetProductByIdDTO());

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Produto obtido com sucesso',
          data: foundProductMock,
        },
      });
    });

    it('should return correctly (product not found)', async () => {
      const { productController } = makeSut();

      const response = await productController.getProductById(mockGetProductByIdDTO());

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorGetProductByIdMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { productController } = makeSut();

      const response = await productController.getProductById(mockGetProductByIdDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao obter produto: Erro mockado',
        },
      });
    });
  });

  describe('updateProduct method', () => {
    it('should return correctly (updated succesfully)', async () => {
      const { productController } = makeSut();

      const response = await productController.updateProduct(mockUpdateProductDTO());

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Produto atualizado com sucesso',
          data: updatedProductMock,
        },
      });
    });

    it('should return correctly (not updated, invalid fields)', async () => {
      const { productController } = makeSut();

      const response = await productController.updateProduct(mockUpdateProductDTO());

      expect(response).toEqual({
        status: 400,
        result: {
          message: errorUpdateProductMock.message,
          data: null,
          errors: errorUpdateProductMock.errorsList,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { productController } = makeSut();

      const response = await productController.updateProduct(mockUpdateProductDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao executar a atualização de um produto: Erro mockado',
        },
      });
    });
  });
});
