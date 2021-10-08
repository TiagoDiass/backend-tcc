import { Request, Response } from 'express';
import ProductController from 'adapters/controllers/ProductController/ProductController';

export default class ApiProductController {
  constructor(private readonly productsController: ProductController) {}

  async list(req: Request, res: Response) {
    try {
      const response = await this.productsController.listProducts();

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description } = req.body;

      const response = await this.productsController.createProduct({
        name,
        description,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.productsController.deleteProduct({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.productsController.getProductById({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const response = await this.productsController.updateProduct({
        id,
        name,
        description,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
