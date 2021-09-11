import ApiServiceController from 'adapters/api/ApiServiceController';
import ServiceController from 'adapters/controllers/ServiceController/ServiceController';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import MongoServiceRepository from 'adapters/database/MongoServiceRepository';
import { Router } from 'express';

const routes = Router();

const apiServiceController = new ApiServiceController(
  new ServiceController(
    new MongoServiceRepository(
      new MongoConnection({
        address: 'localhost',
        user: 'mongodb',
        password: 'backend_tcc',
        databaseName: 'BACKEND_TCC',
      })
    )
  )
);

routes.get('/', async (req, res) => await apiServiceController.list(req, res));

routes.post('/create', async (req, res) => await apiServiceController.create(req, res));

routes.delete('/delete/:id', async (req, res) => await apiServiceController.delete(req, res));

routes.get('/:id', async (req, res) => await apiServiceController.getById(req, res));

routes.put('/update/:id', async (req, res) => await apiServiceController.update(req, res));

export default routes;
