import {
  mockDeleteTransactionDTO,
  mockTransaction,
  mockTransactionRepository,
} from '@testUtils/transactionsMocks';
import ITransactionRepository from 'domain/ports/TransactionRepository';
import DeleteTransaction from './DeleteTransaction';

describe('Service: DeleteTransaction', () => {
  it('should return correctly if transaction has been deleted successfully', async () => {
    const deleteTransactionDTO = mockDeleteTransactionDTO();

    const transactionRepositoryMock: ITransactionRepository = {
      ...mockTransactionRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockTransaction() }),
      delete: jest.fn().mockResolvedValue({ data: deleteTransactionDTO.id }),
    };

    const deleteTransaction = new DeleteTransaction(transactionRepositoryMock);

    const response = await deleteTransaction.execute(deleteTransactionDTO);

    expect(transactionRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(transactionRepositoryMock.findById).toHaveBeenCalledWith(deleteTransactionDTO.id);
    expect(transactionRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(transactionRepositoryMock.delete).toHaveBeenCalledWith(deleteTransactionDTO.id);

    expect(response).toEqual({
      status: 200,
      result: deleteTransactionDTO.id,
    });
  });

  it('should return correctly if there is no transaction with the received id', async () => {
    const transactionRepositoryMock: ITransactionRepository = {
      ...mockTransactionRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const deleteTransaction = new DeleteTransaction(transactionRepositoryMock);

    const response = await deleteTransaction.execute(mockDeleteTransactionDTO());

    expect(transactionRepositoryMock.delete).not.toHaveBeenCalled();
    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhuma transação cadastrada com o ID informado',
      },
    });
  });

  it('should return correctly if TransactionRepository throws an exception', async () => {
    const transactionRepositoryMock: ITransactionRepository = {
      ...mockTransactionRepository(),
      findById: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const deleteTransaction = new DeleteTransaction(transactionRepositoryMock);

    const response = await deleteTransaction.execute(mockDeleteTransactionDTO());

    expect(transactionRepositoryMock.delete).not.toHaveBeenCalled();
    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
