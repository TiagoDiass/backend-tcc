import ApiProductController from 'adapters/api/ApiProductController';
import ProductController from 'adapters/controllers/ProductController/ProductController';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import MongoProductRepository from 'adapters/database/repositories/ProductRepository/MongoProductRepository';
import { Router } from 'express';

const routes = Router();

const apiProductController = new ApiProductController(
  new ProductController(
    new MongoProductRepository(
      new MongoConnection({
        address: process.env.MONGODB_LOCAL_DEV_ADDRESS || '',
        user: process.env.MONGODB_LOCAL_DEV_USER || '',
        password: process.env.MONGODB_LOCAL_DEV_PASSWORD || '',
        databaseName: process.env.MONGODB_LOCAL_DEV_DATABASE_NAME || '',
      })
    )
  )
);

routes.get('/', async (req, res) => await apiProductController.list(req, res));

routes.post('/create', async (req, res) => await apiProductController.create(req, res));

routes.delete('/delete/:id', async (req, res) => await apiProductController.delete(req, res));

routes.get('/:id', async (req, res) => await apiProductController.getById(req, res));

routes.put('/update/:id', async (req, res) => await apiProductController.update(req, res));

export default routes;
