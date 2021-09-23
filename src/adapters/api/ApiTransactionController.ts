import { Request, Response } from 'express';
import TransactionController from 'adapters/controllers/TransactionController/TransactionController';

export default class ApiTransactionController {
  constructor(private readonly transactionsController: TransactionController) {}

  async list(req: Request, res: Response) {
    try {
      const response = await this.transactionsController.listTransactions();

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, value, type, date } = req.body;

      const response = await this.transactionsController.createTransaction({
        title,
        value,
        type,
        date,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.transactionsController.deleteTransaction({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.transactionsController.getTransactionById({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, value, type, date } = req.body;

      const response = await this.transactionsController.updateTransaction({
        id,
        title,
        value,
        type,
        date,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async getCurrentBalance(req: Request, res: Response) {
    try {
      const response = await this.transactionsController.getCurrentBalance();

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
