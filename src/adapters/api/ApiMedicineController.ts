import { Request, Response } from 'express';
import MedicineController from 'adapters/controllers/MedicineController/MedicineController';

export default class ApiMedicineController {
  constructor(private readonly medicineController: MedicineController) {}

  async list(req: Request, res: Response) {
    try {
      const response = await this.medicineController.listMedicines();

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description, expirationDate, amount } = req.body;

      const response = await this.medicineController.createMedicine({
        name,
        description,
        expirationDate,
        amount,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.medicineController.deleteMedicine({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.medicineController.getMedicineById({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, expirationDate, amount } = req.body;

      const response = await this.medicineController.updateMedicine({
        id,
        name,
        description,
        expirationDate,
        amount,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
