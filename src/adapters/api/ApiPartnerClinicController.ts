import { Request, Response } from 'express';
import PartnerClinicController from 'adapters/controllers/PartnerClinicController/PartnerClinicController';

export default class ApiPartnerClinicController {
  constructor(private readonly partnerClinicController: PartnerClinicController) {}

  async list(req: Request, res: Response) {
    try {
      const response = await this.partnerClinicController.listPartnerClinics();

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, phone, email, cnpj, address } = req.body;

      const response = await this.partnerClinicController.createPartnerClinic({
        name,
        phone,
        email,
        cnpj,
        address,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.partnerClinicController.deletePartnerClinic({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.partnerClinicController.getPartnerClinicById({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, phone, email, cnpj, address } = req.body;

      const response = await this.partnerClinicController.updatePartnerClinic({
        id,
        name,
        phone,
        email,
        cnpj,
        address,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
