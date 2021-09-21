import ApiTransactionController from 'adapters/api/ApiTransactionController';
import TransactionController from 'adapters/controllers/TransactionController/TransactionController';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import MongoTransactionRepository from 'adapters/database/repositories/TransactionRepository/MongoTransactionRepository';
import { Router } from 'express';

const routes = Router();

const apiTransactionController = new ApiTransactionController(
  new TransactionController(
    new MongoTransactionRepository(
      new MongoConnection({
        address: 'localhost',
        user: 'mongodb',
        password: 'backend_tcc',
        databaseName: 'BACKEND_TCC',
      })
    )
  )
);

routes.get('/', async (req, res) => await apiTransactionController.list(req, res));

routes.post('/create', async (req, res) => await apiTransactionController.create(req, res));

routes.delete('/delete/:id', async (req, res) => await apiTransactionController.delete(req, res));

routes.get('/:id', async (req, res) => await apiTransactionController.getById(req, res));

routes.put('/update/:id', async (req, res) => await apiTransactionController.update(req, res));

export default routes;
