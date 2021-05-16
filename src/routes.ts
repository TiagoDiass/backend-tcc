import ServiceController from 'adapters/controllers/ServiceController';
import MemoryServiceRepository from 'adapters/database/MemoryServiceRepository';
import { Router } from 'express';

const routes = Router();

const controller = new ServiceController(new MemoryServiceRepository());

routes.get(
  '/services',
  async (req, res) => await controller.listServices(req, res)
);

routes.post(
  '/services/create',
  async (req, res) => await controller.createService(req, res)
);

export default routes;
