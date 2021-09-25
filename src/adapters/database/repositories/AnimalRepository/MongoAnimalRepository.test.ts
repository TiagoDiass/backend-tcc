import MongoAnimalRepository from './MongoAnimalRepository';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import { mockAnimal } from '@testUtils/animalsMocks';
import Animal from 'domain/entities/Animal/Animal';
import Service from 'domain/entities/Service/Service';

const COLLECTION_NAME = 'Animals';

describe('MongoDB Repository: AnimalRepository', () => {
  const mongoConnection = new MongoConnection({
    address: 'localhost',
    user: 'mongodb',
    password: 'backend_tcc',
    databaseName: 'BACKEND_TCC_TESTS',
  });

  const mongoAnimalRepository = new MongoAnimalRepository(mongoConnection);

  afterAll(async () => {
    await mongoConnection.closeConnection();
  });

  test('method: save()', async () => {
    const animal = mockAnimal();
    const response = await mongoAnimalRepository.save(animal);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Animal);
    expect(response.data.id).toBe(animal.id);
  });

  test('method: list()', async () => {
    const animals = [mockAnimal(), mockAnimal(), mockAnimal()];

    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).deleteMany({});
    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).insertMany(animals);

    const response = await mongoAnimalRepository.list();

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(animals.length);

    response.data.forEach((service, index) => {
      expect(service).toBeInstanceOf(Animal);
      expect(service.id).toBe(animals[index].id);
    });
  });

  test('method: findById() - animal found sucessfully', async () => {
    const animal = mockAnimal();

    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).insertOne(animal);

    const response = await mongoAnimalRepository.findById(animal.id);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Animal);
    expect(response.data?.id).toBe(animal.id);
  });

  test('method: findById() - animal not found', async () => {
    const response = await mongoAnimalRepository.findById('fake-id');

    expect(response.status).toBe(404);
    expect(response.data).toBeNull();
  });

  test('method: delete()', async () => {
    const animal = mockAnimal();

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(animal);

    const response = await mongoAnimalRepository.delete(animal.id);

    expect(response).toEqual({
      status: 200,
      data: animal.id,
    });

    expect(await dbCollection.findOne({ id: animal.id })).toBeNull();
  });

  test('method: update()', async () => {
    const animal = mockAnimal();
    const updatedAnimal = new Animal({
      ...animal,
      name: 'nome atualizado',
    });

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(animal);

    const response = await mongoAnimalRepository.update(updatedAnimal);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Animal);
    expect(response.data).toMatchObject({
      id: updatedAnimal.id,
      name: updatedAnimal.name,
    });
  });
});
