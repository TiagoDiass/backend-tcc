import TransactionController from './TransactionController';
import { mockTransaction, mockTransactionRepository } from '@testUtils/transactionsMocks';

const makeSut = () => {
  const transactionRepositoryMock = mockTransactionRepository();
  const transactionController = new TransactionController(transactionRepositoryMock);

  return { transactionController };
};

// ListTransactions mock
const transactionsToBeReturned = [mockTransaction(), mockTransaction()];

const mockListTransactionsExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: transactionsToBeReturned })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/TransactionServices/ListTransactions/ListTransactions', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockListTransactionsExecute,
  }));
});

describe('Controller: TransactionController', () => {
  describe('method: listTransactions', () => {
    it('should return correctly (list successfully)', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.listTransactions();

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Lista de transações obtida com sucesso',
          data: transactionsToBeReturned,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.listTransactions();

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao listar transações: Erro mockado',
        },
      });
    });
  });
});
