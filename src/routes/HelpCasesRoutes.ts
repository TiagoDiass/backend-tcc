import ApiHelpCaseController from 'adapters/api/ApiHelpCaseController';
import HelpCaseController from 'adapters/controllers/HelpCaseController/HelpCaseController';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import MongoHelpCaseRepository from 'adapters/database/repositories/HelpCaseRepository/MongoHelpCaseRepository';
import { Router } from 'express';

const routes = Router();

const apiHelpCaseController = new ApiHelpCaseController(
  new HelpCaseController(
    new MongoHelpCaseRepository(
      new MongoConnection({
        address: process.env.MONGODB_LOCAL_DEV_ADDRESS || '',
        user: process.env.MONGODB_LOCAL_DEV_USER || '',
        password: process.env.MONGODB_LOCAL_DEV_PASSWORD || '',
        databaseName: process.env.MONGODB_LOCAL_DEV_DATABASE_NAME || '',
      })
    )
  )
);

routes.get('/', async (req, res) => await apiHelpCaseController.list(req, res));

routes.post('/create', async (req, res) => await apiHelpCaseController.create(req, res));

routes.delete('/delete/:id', async (req, res) => await apiHelpCaseController.delete(req, res));

routes.get('/:id', async (req, res) => await apiHelpCaseController.getById(req, res));

routes.put('/update/:id', async (req, res) => await apiHelpCaseController.update(req, res));

export default routes;
