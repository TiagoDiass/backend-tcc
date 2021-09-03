import Transaction from 'domain/entities/Transaction/Transaction';
import ITransactionRepository from 'domain/ports/TransactionRepository';
import { IRequestGetTransactionByIdDTO } from 'domain/services/dto';
import faker from 'faker';

export const mockTransactionRepository = (): ITransactionRepository => ({
  list: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

export const mockTransaction = (): Transaction =>
  new Transaction({
    title: faker.random.words(2),
    date: faker.date.recent().toISOString().split('T')[0],
    type: faker.random.arrayElement(['deposit', 'withdraw']),
    value: faker.datatype.number(),
  });

export const mockGetTransactionByIdDTO = (): IRequestGetTransactionByIdDTO => ({
  id: faker.datatype.uuid(),
});
