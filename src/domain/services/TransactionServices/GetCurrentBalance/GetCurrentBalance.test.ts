import GetCurrentBalance from './GetCurrentBalance';
import Transaction from 'domain/entities/Transaction/Transaction';
import { mockTransaction, mockTransactionRepository } from '@testUtils/transactionsMocks';
import ITransactionRepository from 'domain/ports/TransactionRepository';

describe('Service: GetCurrentBalance', () => {
  it('should return correctly', async () => {
    const transactionsMocks = [
      {
        ...mockTransaction(),
        value: 12550, // R$ 125,50
        type: 'deposit',
      } as Transaction,
      {
        ...mockTransaction(),
        value: 11000, // R$ 110,00
        type: 'deposit',
      } as Transaction,
      {
        ...mockTransaction(),
        value: 10000, // R$ 100,00
        type: 'withdraw',
      } as Transaction,
      {
        ...mockTransaction(),
        value: 3000, // R$ 30,00
        type: 'deposit',
      } as Transaction,
    ];

    const transactionRepositoryMock: ITransactionRepository = {
      ...mockTransactionRepository(),
      list: jest.fn().mockResolvedValue({ data: transactionsMocks }),
    };

    const getCurrentBalance = new GetCurrentBalance(transactionRepositoryMock);

    const response = await getCurrentBalance.execute();

    expect(transactionRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 200,
      result: {
        total: 165.5, // 125,50 + 110,00 - 100,00 + 30,00 = 165,50
        entries: 265.5, // 125,50 + 110,00 + 30,00 = 265,50
        withdraws: 100,
      },
    });
  });

  it('should return correctly if TransactionRepository throws an exception', async () => {
    const transactionRepositoryMock: ITransactionRepository = {
      ...mockTransactionRepository(),
      list: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const getCurrentBalance = new GetCurrentBalance(transactionRepositoryMock);

    const response = await getCurrentBalance.execute();

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
