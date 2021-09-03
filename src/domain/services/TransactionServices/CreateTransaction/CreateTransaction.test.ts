import CreateTransaction from './CreateTransaction';
import { IRequestCreateTransactionDTO } from 'domain/services/dto';
import { mockTransactionsRepository } from '@testUtils/transactionsMocks';

const UUID_MOCK = '1e16f407-1cef-427c-af39-e9c3efcbd18e';

jest.mock('uuid', () => ({
  v4: jest.fn().mockImplementation(() => UUID_MOCK),
}));

describe('Service: CreateTransaction', () => {
  it('should call transactionRepository.save() and return correctly', async () => {
    const transactionRepositoryMock = {
      ...mockTransactionsRepository(),

      save: jest.fn().mockImplementationOnce(transaction => ({
        data: transaction,
      })),
    };

    const createTransaction = new CreateTransaction(transactionRepositoryMock);

    const createTransactionDTO: IRequestCreateTransactionDTO = {
      title: 'título da transação',
      type: 'deposit',
      value: 7500, // R$ 75
      date: '2021-09-02',
    };

    const response = await createTransaction.execute(createTransactionDTO);

    expect(transactionRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(transactionRepositoryMock.save).toHaveBeenCalledWith({
      id: UUID_MOCK,
      title: 'título da transação',
      type: 'deposit',
      value: 7500, // R$ 75
      date: '2021-09-02',
    });

    expect(response).toEqual({
      status: 201,
      result: {
        id: UUID_MOCK,
        title: 'título da transação',
        type: 'deposit',
        value: 7500, // R$ 75
        date: '2021-09-02',
      },
    });
  });

  it.todo('should return correctly if Transaction entity throws an exception');

  it.todo('should return correctly if TransactionRepository entity throws an exception');
});
