import MongoTransactionRepository from './MongoTransactionRepository';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import Transaction from 'domain/entities/Transaction/Transaction';
import { mockTransaction } from '@testUtils/transactionsMocks';

const COLLECTION_NAME = 'Transactions';

describe('MongoDB Repository: TransactionRepository', () => {
  const mongoConnection = new MongoConnection({
    address: process.env.MONGODB_TESTS_ADDRESS || '',
    user: process.env.MONGODB_TESTS_USER || '',
    password: process.env.MONGODB_TESTS_PASSWORD || '',
    databaseName: process.env.MONGODB_TESTS_DATABASE_NAME || '',
  });

  const mongoTransactionRepository = new MongoTransactionRepository(mongoConnection);

  afterAll(async () => {
    await mongoConnection.closeConnection();
  });

  test('method: save()', async () => {
    const transaction = mockTransaction();
    const response = await mongoTransactionRepository.save(transaction);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Transaction);
    expect(response.data.id).toBe(transaction.id);
  });

  test('method: list()', async () => {
    const transactions = [mockTransaction(), mockTransaction(), mockTransaction()];

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.deleteMany({});
    await dbCollection.insertMany(transactions);

    const response = await mongoTransactionRepository.list();

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(transactions.length);

    response.data.forEach((transaction, index) => {
      expect(transaction).toBeInstanceOf(Transaction);
      expect(transaction.id).toBe(transactions[index].id);
    });
  });

  test('method: findById() - transaction found sucessfully', async () => {
    const transaction = mockTransaction();

    await (await mongoConnection.getConnection())
      .collection(COLLECTION_NAME)
      .insertOne(transaction);

    const response = await mongoTransactionRepository.findById(transaction.id);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Transaction);
    expect(response.data?.id).toBe(transaction.id);
  });

  test('method: findById() - transaction not found', async () => {
    const response = await mongoTransactionRepository.findById('fake-id');

    expect(response.status).toBe(404);
    expect(response.data).toBeNull();
  });

  test('method: delete()', async () => {
    const transaction = mockTransaction();

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(transaction);

    const response = await mongoTransactionRepository.delete(transaction.id);

    expect(response).toEqual({
      status: 200,
      data: transaction.id,
    });

    expect(await dbCollection.findOne({ id: transaction.id })).toBeNull();
  });

  test('method: update()', async () => {
    const transaction = mockTransaction();
    const updatedTransaction = new Transaction({
      ...transaction,
      title: 'título atualizado',
    });

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(transaction);

    const response = await mongoTransactionRepository.update(updatedTransaction);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Transaction);
    expect(response.data).toMatchObject({
      id: updatedTransaction.id,
      title: updatedTransaction.title,
    });
  });
});
