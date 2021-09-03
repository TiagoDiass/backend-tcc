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

  it.todo('should return correctly if transaction has not been found');

  it.todo('should return correctly if TransactionRepository throws an exception');
});
