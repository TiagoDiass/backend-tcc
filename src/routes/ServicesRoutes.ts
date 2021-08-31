import ApiServiceController from 'adapters/api/ApiServiceController';
import ServiceController from 'adapters/controllers/ServiceController';
import MemoryServiceRepository from 'adapters/database/MemoryServiceRepository';
import { Router } from 'express';

const routes = Router();

const apiServiceController = new ApiServiceController(
  new ServiceController(new MemoryServiceRepository())
);

routes.get('/', async (req, res) => await apiServiceController.list(req, res));

routes.post('/create', async (req, res) => await apiServiceController.create(req, res));

routes.delete('/delete/:id', async (req, res) => await apiServiceController.delete(req, res));

routes.get('/:id', async (req, res) => await apiServiceController.getById(req, res));

routes.put('/update/:id', async (req, res) => await apiServiceController.update(req, res));

export default routes;
