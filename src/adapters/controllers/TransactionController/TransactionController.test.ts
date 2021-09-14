import TransactionController from './TransactionController';
import {
  mockCreateTransactionDTO,
  mockTransaction,
  mockTransactionRepository,
} from '@testUtils/transactionsMocks';

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

// CreateTransaction mock
const createdTransactionMock = mockTransaction();
const errorCreateTransactionMock = {
  message: 'Erro ao criar transação',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
};
const mockCreateTransactionExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 201, result: createdTransactionMock })
  .mockResolvedValueOnce({ status: 400, error: errorCreateTransactionMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/TransactionServices/CreateTransaction/CreateTransaction', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockCreateTransactionExecute,
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

  describe('method: createTransaction', () => {
    it('should return correctly (created successfully)', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.createTransaction(mockCreateTransactionDTO());

      expect(response).toEqual({
        status: 201,
        result: {
          message: 'Transação criada com sucesso',
          data: createdTransactionMock,
        },
      });
    });

    it('should return correctly (not created, invalid fields)', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.createTransaction(
        mockCreateTransactionDTO() // correct data, but the service has been mocked to return error
      );

      expect(response).toEqual({
        status: 400,
        result: {
          message: errorCreateTransactionMock.message,
          errors: errorCreateTransactionMock.errorsList,
          data: null,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.createTransaction(mockCreateTransactionDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao executar a criação de uma transação: Erro mockado',
        },
      });
    });
  });
});
