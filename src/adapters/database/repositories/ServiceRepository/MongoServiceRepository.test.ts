import MongoServiceRepository from './MongoServiceRepository';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import Service from 'domain/entities/Service/Service';
import { mockService } from '@testUtils/servicesMocks';

const COLLECTION_NAME = 'Services';

describe('MongoDB Repository: ServiceRepository', () => {
  const mongoConnection = new MongoConnection({
    address: 'localhost',
    user: 'mongodb',
    password: 'backend_tcc',
    databaseName: 'BACKEND_TCC_TESTS',
  });

  const mongoServiceRepository = new MongoServiceRepository(mongoConnection);

  afterAll(async () => {
    await mongoConnection.closeConnection();
  });

  test('method: save()', async () => {
    const service = mockService();
    const response = await mongoServiceRepository.save(service);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Service);
    expect(response.data.id).toBe(service.id);
  });

  test('method: list()', async () => {
    const services = [mockService(), mockService(), mockService()];

    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).deleteMany({});
    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).insertMany(services);

    const response = await mongoServiceRepository.list();

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(services.length);

    response.data.forEach((service, index) => {
      expect(service).toBeInstanceOf(Service);
      expect(service.id).toBe(services[index].id);
    });
  });

  test.todo('method: findById() - service found sucessfully');

  test.todo('method: findById() - service not found');

  test.todo('method: delete()');

  test.todo('method: update()');
});
