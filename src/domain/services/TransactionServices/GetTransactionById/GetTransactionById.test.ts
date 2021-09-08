import GetTransactionById from './GetTransactionById';
import {
  mockGetTransactionByIdDTO,
  mockTransaction,
  mockTransactionRepository,
} from '@testUtils/transactionsMocks';

describe('Service: GetTransactionById', () => {
  it('should return correctly if transaction has been found', async () => {
    const getTransactionByIdDTO = mockGetTransactionByIdDTO();
    const transactionToBeReturned = mockTransaction();

    const transactionRepositoryMock = {
      ...mockTransactionRepository(),
      findById: jest.fn().mockResolvedValue({ data: transactionToBeReturned }),
    };

    const getTransactionById = new GetTransactionById(transactionRepositoryMock);
    const response = await getTransactionById.execute(getTransactionByIdDTO);

    expect(transactionRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(transactionRepositoryMock.findById).toHaveBeenCalledWith(getTransactionByIdDTO.id);
    expect(response).toEqual({
      status: 200,
      result: transactionToBeReturned,
    });
  });

  it('should return correctly if transaction has not been found', async () => {
    const getTransactionByIdDTO = mockGetTransactionByIdDTO();

    const transactionRepositoryMock = {
      ...mockTransactionRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const getTransactionById = new GetTransactionById(transactionRepositoryMock);
    const response = await getTransactionById.execute(getTransactionByIdDTO);

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhuma transação cadastrada com o ID informado',
      },
    });
  });

  it('should return correctly if TransactionRepository throws an exception', async () => {
    const transactionRepositoryMock = {
      ...mockTransactionRepository(),
      findById: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const getTransactionById = new GetTransactionById(transactionRepositoryMock);
    const response = await getTransactionById.execute(mockGetTransactionByIdDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
