import ListTransactions from './ListTransactions';
import { mockTransaction, mockTransactionRepository } from '@testUtils/transactionsMocks';
import ITransactionRepository from 'domain/ports/TransactionRepository';

describe('Service: ListTransactions', () => {
  it('should call transactionRepository.list() and return correctly', async () => {
    const transactionsToBeReturned = [mockTransaction(), mockTransaction()];

    const transactionRepositoryMock: ITransactionRepository = {
      ...mockTransactionRepository(),

      list: jest.fn().mockResolvedValue({
        data: transactionsToBeReturned,
      }),
    };

    const listTransactions = new ListTransactions(transactionRepositoryMock);

    const response = await listTransactions.execute();

    expect(transactionRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 200,
      result: transactionsToBeReturned,
    });
  });

  it('should return correctly if TransactionRepository throws an exception', async () => {
    const transactionRepositoryMock: ITransactionRepository = {
      ...mockTransactionRepository(),

      list: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const listTransactions = new ListTransactions(transactionRepositoryMock);

    const response = await listTransactions.execute();

    expect(transactionRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 500,
      error: { message: 'Erro mockado' },
    });
  });
});
