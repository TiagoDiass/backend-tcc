import { Request, Response } from 'express';
import HelpCaseController from 'adapters/controllers/HelpCaseController/HelpCaseController';

export default class ApiHelpCaseController {
  constructor(private readonly helpCasesController: HelpCaseController) {}

  async list(req: Request, res: Response) {
    try {
      const response = await this.helpCasesController.listHelpCases();

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, description, pictures, poolMoneyUrl } = req.body;

      const response = await this.helpCasesController.createHelpCase({
        title,
        description,
        pictures,
        poolMoneyUrl,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.helpCasesController.deleteHelpCase({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.helpCasesController.getHelpCaseById({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, pictures, poolMoneyUrl } = req.body;

      const response = await this.helpCasesController.updateHelpCase({
        id,
        title,
        description,
        pictures,
        poolMoneyUrl,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
