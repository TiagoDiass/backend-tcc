import ApiAnimalController from 'adapters/api/ApiAnimalController';
import AnimalController from 'adapters/controllers/AnimalController/AnimalController';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import MongoAnimalRepository from 'adapters/database/repositories/AnimalRepository/MongoAnimalRepository';
import { Router } from 'express';

const routes = Router();

const apiAnimalController = new ApiAnimalController(
  new AnimalController(
    new MongoAnimalRepository(
      new MongoConnection({
        address: process.env.MONGODB_LOCAL_DEV_ADDRESS || '',
        user: process.env.MONGODB_LOCAL_DEV_USER || '',
        password: process.env.MONGODB_LOCAL_DEV_PASSWORD || '',
        databaseName: process.env.MONGODB_LOCAL_DEV_DATABASE_NAME || '',
      })
    )
  )
);

routes.get('/', async (req, res) => await apiAnimalController.list(req, res));

routes.post('/create', async (req, res) => await apiAnimalController.create(req, res));

routes.delete('/delete/:id', async (req, res) => await apiAnimalController.delete(req, res));

routes.get('/:id', async (req, res) => await apiAnimalController.getById(req, res));

routes.put('/update/:id', async (req, res) => await apiAnimalController.update(req, res));

export default routes;
