import { Request, Response } from 'express';
import ServiceController from 'adapters/controllers/ServiceController/ServiceController';

export default class ApiServiceController {
  constructor(private readonly servicesController: ServiceController) {}

  async list(req: Request, res: Response) {
    try {
      const response = await this.servicesController.listServices();

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;

      const response = await this.servicesController.createService({
        title,
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

      const response = await this.servicesController.deleteService({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.servicesController.getServiceById({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const response = await this.servicesController.updateService({
        id,
        title,
        description,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
