import MongoServiceRepository from './MongoServiceRepository';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import Service from 'domain/entities/Service/Service';
import { mockService } from '@testUtils/servicesMocks';

const COLLECTION_NAME = 'Services';

describe('MongoDB Repository: ServiceRepository', () => {
  const mongoConnection = new MongoConnection({
    address: process.env.MONGODB_TESTS_ADDRESS || '',
    user: process.env.MONGODB_TESTS_USER || '',
    password: process.env.MONGODB_TESTS_PASSWORD || '',
    databaseName: process.env.MONGODB_TESTS_DATABASE_NAME || '',
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

  test('method: findById() - service found sucessfully', async () => {
    const service = mockService();

    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).insertOne(service);

    const response = await mongoServiceRepository.findById(service.id);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Service);
    expect(response.data?.id).toBe(service.id);
  });

  test('method: findById() - service not found', async () => {
    const response = await mongoServiceRepository.findById('fake-id');

    expect(response.status).toBe(404);
    expect(response.data).toBeNull();
  });

  test('method: delete()', async () => {
    const service = mockService();

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(service);

    const response = await mongoServiceRepository.delete(service.id);

    expect(response).toEqual({
      status: 200,
      data: service.id,
    });

    expect(await dbCollection.findOne({ id: service.id })).toBeNull();
  });

  test('method: update()', async () => {
    const service = mockService();
    const updatedService = new Service({
      ...service,
      title: 'título atualizado',
    });

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(service);

    const response = await mongoServiceRepository.update(updatedService);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Service);
    expect(response.data).toMatchObject({
      id: updatedService.id,
      title: updatedService.title,
    });
  });
});
