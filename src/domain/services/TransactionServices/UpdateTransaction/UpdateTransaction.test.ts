import UpdateTransaction from './UpdateTransaction';
import Transaction from 'domain/entities/Transaction/Transaction';
import ITransactionRepository from 'domain/ports/TransactionRepository';
import {
  mockUpdateTransactionDTO,
  mockTransaction,
  mockTransactionRepository,
} from '@testUtils/transactionsMocks';
import { IRequestUpdateTransactionDTO } from 'domain/services/dto';

describe('Service: UpdateTransaction', () => {
  it('should return correctly if transaction was found and successfully updated', async () => {
    const updateTransactionDTO = mockUpdateTransactionDTO();
    const notUpdatedTransaction = new Transaction({
      ...mockTransaction(),
      id: updateTransactionDTO.id,
    });
    const updatedTransaction = new Transaction(updateTransactionDTO);

    const transactionRepositoryMock: ITransactionRepository = {
      ...mockTransactionRepository(),
      findById: jest.fn().mockResolvedValue({ data: notUpdatedTransaction }),
      update: jest.fn().mockResolvedValue({ data: updatedTransaction }),
    };

    const updateTransaction = new UpdateTransaction(transactionRepositoryMock);

    const response = await updateTransaction.execute(updateTransactionDTO);

    expect(transactionRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(transactionRepositoryMock.findById).toHaveBeenCalledWith(updateTransactionDTO.id);
    expect(transactionRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(transactionRepositoryMock.update).toHaveBeenCalledWith(updatedTransaction);

    expect(response).toEqual({
      status: 200,
      result: updatedTransaction,
    });
  });

  it('should return correctly if transaction has not been found', async () => {
    const updateTransactionDTO = mockUpdateTransactionDTO();

    const transactionRepositoryMock: ITransactionRepository = {
      ...mockTransactionRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const updateTransaction = new UpdateTransaction(transactionRepositoryMock);

    const response = await updateTransaction.execute(updateTransactionDTO);

    expect(transactionRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(transactionRepositoryMock.findById).toHaveBeenCalledWith(updateTransactionDTO.id);
    expect(transactionRepositoryMock.update).not.toHaveBeenCalled();

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhuma transação cadastrada com o ID informado',
      },
    });
  });

  it('should return correctly if Transaction entity throws an exception', async () => {
    const updateTransactionDTO: IRequestUpdateTransactionDTO = {
      ...mockUpdateTransactionDTO(),
      value: 0, // invalid value, it should be greater than 0
    };

    const transactionRepositoryMock: ITransactionRepository = {
      ...mockTransactionRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockTransaction() }),
    };

    const updateTransaction = new UpdateTransaction(transactionRepositoryMock);

    const response = await updateTransaction.execute(updateTransactionDTO);

    expect(transactionRepositoryMock.update).not.toHaveBeenCalled();
    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Transação inválida',
        errorsList: ['valor da transação deve ser maior que zero'],
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

    const updateTransaction = new UpdateTransaction(transactionRepositoryMock);

    const response = await updateTransaction.execute(mockUpdateTransactionDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
