import { mockHelpCase } from '@testUtils/helpCasesMocks';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import HelpCase from 'domain/entities/HelpCase/HelpCase';
import MongoHelpCaseRepository from './MongoHelpCaseRepository';

const COLLECTION_NAME = 'HelpCases';

describe('MongoDB Repository: HelpCaseRepository', () => {
  const mongoConnection = new MongoConnection({
    address: process.env.MONGODB_TESTS_ADDRESS || '',
    user: process.env.MONGODB_TESTS_USER || '',
    password: process.env.MONGODB_TESTS_PASSWORD || '',
    databaseName: process.env.MONGODB_TESTS_DATABASE_NAME || '',
  });

  const mongoHelpCaseRepository = new MongoHelpCaseRepository(mongoConnection);

  afterAll(async () => {
    await mongoConnection.closeConnection();
  });

  test('method: save()', async () => {
    const helpCase = mockHelpCase();
    const response = await mongoHelpCaseRepository.save(helpCase);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(HelpCase);
    expect(response.data.id).toBe(helpCase.id);
  });

  test('method: list()', async () => {
    const helpCases = [mockHelpCase(), mockHelpCase(), mockHelpCase()];

    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).deleteMany({});
    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).insertMany(helpCases);

    const response = await mongoHelpCaseRepository.list();

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(helpCases.length);

    response.data.forEach((helpCase, index) => {
      expect(helpCase).toBeInstanceOf(HelpCase);
      expect(helpCase.id).toBe(helpCases[index].id);
    });
  });

  test('method: findById() - helpCase found sucessfully', async () => {
    const helpCase = mockHelpCase();

    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).insertOne(helpCase);

    const response = await mongoHelpCaseRepository.findById(helpCase.id);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(HelpCase);
    expect(response.data?.id).toBe(helpCase.id);
  });

  test('method: findById() - helpCase not found', async () => {
    const response = await mongoHelpCaseRepository.findById('fake-id');

    expect(response.status).toBe(404);
    expect(response.data).toBeNull();
  });

  test('method: delete()', async () => {
    const helpCase = mockHelpCase();

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(helpCase);

    const response = await mongoHelpCaseRepository.delete(helpCase.id);

    expect(response).toEqual({
      status: 200,
      data: helpCase.id,
    });

    expect(await dbCollection.findOne({ id: helpCase.id })).toBeNull();
  });

  test('method: update()', async () => {
    const helpCase = mockHelpCase();
    const updatedHelpCase = new HelpCase({
      ...helpCase,
      title: 'titulo atualizado',
    });

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(helpCase);

    const response = await mongoHelpCaseRepository.update(updatedHelpCase);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(HelpCase);
    expect(response.data).toMatchObject({
      id: updatedHelpCase.id,
      title: updatedHelpCase.title,
    });
  });
});
