import ApiPartnerClinicController from 'adapters/api/ApiPartnerClinicController';
import PartnerClinicController from 'adapters/controllers/PartnerClinicController/PartnerClinicController';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import MongoPartnerClinicRepository from 'adapters/database/repositories/PartnerClinicRepository/MongoPartnerClinicRepository';
import { Router } from 'express';

const routes = Router();

const apiPartnerClinicController = new ApiPartnerClinicController(
  new PartnerClinicController(
    new MongoPartnerClinicRepository(
      new MongoConnection({
        address: process.env.MONGODB_LOCAL_DEV_ADDRESS || '',
        user: process.env.MONGODB_LOCAL_DEV_USER || '',
        password: process.env.MONGODB_LOCAL_DEV_PASSWORD || '',
        databaseName: process.env.MONGODB_LOCAL_DEV_DATABASE_NAME || '',
      })
    )
  )
);

routes.get('/', async (req, res) => await apiPartnerClinicController.list(req, res));

routes.post('/create', async (req, res) => await apiPartnerClinicController.create(req, res));

routes.delete('/delete/:id', async (req, res) => await apiPartnerClinicController.delete(req, res));

routes.get('/:id', async (req, res) => await apiPartnerClinicController.getById(req, res));

routes.put('/update/:id', async (req, res) => await apiPartnerClinicController.update(req, res));

export default routes;
