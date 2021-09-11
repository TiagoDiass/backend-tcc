import Transaction from 'domain/entities/Transaction/Transaction';
import ITransactionRepository from 'domain/ports/TransactionRepository';
import { IRequestCreateTransactionDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class CreateTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  public async execute(
    createTransactionDTO: IRequestCreateTransactionDTO
  ): Promise<DomainServiceResult<Transaction>> {
    try {
      const transaction = new Transaction(createTransactionDTO);

      const repoResult = await this.transactionRepository.save(transaction);

      return {
        status: 201,
        result: repoResult.data,
      };
    } catch (error: any) {
      const isInvalidTransactionError = error.type === 'invalid-transaction-error';

      return {
        status: isInvalidTransactionError ? 400 : 500,
        error: {
          message: error.message,
          errorsList: isInvalidTransactionError ? error.errorsList : [],
        },
      };
    }
  }
}
