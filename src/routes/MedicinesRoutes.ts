import ApiMedicineController from 'adapters/api/ApiMedicineController';
import MedicineController from 'adapters/controllers/MedicineController/MedicineController';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import MongoMedicineRepository from 'adapters/database/repositories/MedicineRepository/MongoMedicineRepository';
import { Router } from 'express';

const routes = Router();

const apiMedicineController = new ApiMedicineController(
  new MedicineController(
    new MongoMedicineRepository(
      new MongoConnection({
        address: process.env.MONGODB_LOCAL_DEV_ADDRESS || '',
        user: process.env.MONGODB_LOCAL_DEV_USER || '',
        password: process.env.MONGODB_LOCAL_DEV_PASSWORD || '',
        databaseName: process.env.MONGODB_LOCAL_DEV_DATABASE_NAME || '',
      })
    )
  )
);

routes.get('/', async (req, res) => await apiMedicineController.list(req, res));

routes.post('/create', async (req, res) => await apiMedicineController.create(req, res));

routes.delete('/delete/:id', async (req, res) => await apiMedicineController.delete(req, res));

routes.get('/:id', async (req, res) => await apiMedicineController.getById(req, res));

routes.put('/update/:id', async (req, res) => await apiMedicineController.update(req, res));

export default routes;
