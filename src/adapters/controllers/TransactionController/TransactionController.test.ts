import TransactionController from './TransactionController';
import {
  mockCreateTransactionDTO,
  mockDeleteTransactionDTO,
  mockGetTransactionByIdDTO,
  mockTransaction,
  mockTransactionRepository,
  mockUpdateTransactionDTO,
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
} as const;
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

// DeleteTransaction mock
const deletedTransactionMock = mockTransaction();
const errorDeleteTransactionMock = {
  message: 'Transação não encontrada',
} as const;
const mockDeleteTransactionExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: deletedTransactionMock.id })
  .mockResolvedValueOnce({ status: 404, error: errorDeleteTransactionMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/TransactionServices/DeleteTransaction/DeleteTransaction', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockDeleteTransactionExecute,
  }));
});

// GetTransactionById mock
const foundTransactionMock = mockTransaction();
const errorGetTransactionByIdMock = {
  message: 'Transação não encontrada',
} as const;
const mockGetTransactionByIdExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: foundTransactionMock })
  .mockResolvedValueOnce({ status: 404, error: errorGetTransactionByIdMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/TransactionServices/GetTransactionById/GetTransactionById', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockGetTransactionByIdExecute,
  }));
});

// UpdateTransaction mock
const updatedTransactionMock = mockTransaction();
const errorUpdateTransactionMock = {
  message: 'Erro ao atualizar transação',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
} as const;
const mockUpdateTransactionExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: updatedTransactionMock })
  .mockResolvedValueOnce({ status: 400, error: errorUpdateTransactionMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/TransactionServices/UpdateTransaction/UpdateTransaction', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockUpdateTransactionExecute,
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

  describe('method: deleteTransaction', () => {
    it('should return correctly (successfully deleted)', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.deleteTransaction({
        id: deletedTransactionMock.id,
      });

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Transação excluída com sucesso',
          data: deletedTransactionMock.id,
        },
      });
    });

    it('should return correctly (transaction not found)', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.deleteTransaction(mockDeleteTransactionDTO());

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorDeleteTransactionMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exceptions occurs', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.deleteTransaction(mockDeleteTransactionDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao excluir transação: Erro mockado',
        },
      });
    });
  });

  describe('getTransactionById method', () => {
    it('should return correctly (transaction successfully found)', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.getTransactionById(mockGetTransactionByIdDTO());

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Transação obtida com sucesso',
          data: foundTransactionMock,
        },
      });
    });

    it('should return correctly (transaction not found)', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.getTransactionById(mockGetTransactionByIdDTO());

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorGetTransactionByIdMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.getTransactionById(mockGetTransactionByIdDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao obter transação: Erro mockado',
        },
      });
    });
  });

  describe('updateTransaction method', () => {
    it('should return correctly (updated succesfully)', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.updateTransaction(mockUpdateTransactionDTO());

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Transação atualizada com sucesso',
          data: updatedTransactionMock,
        },
      });
    });

    it('should return correctly (not updated, invalid fields)', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.updateTransaction(mockUpdateTransactionDTO());

      expect(response).toEqual({
        status: 400,
        result: {
          message: errorUpdateTransactionMock.message,
          data: null,
          errors: errorUpdateTransactionMock.errorsList,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { transactionController } = makeSut();

      const response = await transactionController.updateTransaction(mockUpdateTransactionDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao executar a atualização de uma transação: Erro mockado',
        },
      });
    });
  });
});
