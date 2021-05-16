import { Request, Response } from 'express';
import Service from 'domain/entities/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';
import ListServices from 'domain/services/ListServices';
import CreateService from 'domain/services/CreateService';

interface ServiceDTO {
  title: string;
  description?: string;
}

export default class ServiceController {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async listServices(req: Request, res: Response) {
    const listServices = new ListServices(this.serviceRepository);
    const services = await listServices.execute();

    return res.status(200).json({
      message: 'Lista de serviços obtida com sucesso',
      data: {
        services,
      },
    });
  }

  async createService(req: Request, res: Response) {
    const createService = new CreateService(this.serviceRepository);

    try {
      const service = new Service({
        title: req.body.title,
        description: req.body.description,
      });

      const createdService = await createService.execute(service);

      return res.status(201).json({
        message: 'Serviço criado com sucesso',
        data: createdService,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        errors: error.errorsList || ['Erro inesperado.'],
      });
    }
  }
}
