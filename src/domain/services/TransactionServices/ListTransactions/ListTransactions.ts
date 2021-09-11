import Transaction from 'domain/entities/Transaction/Transaction';
import ITransactionRepository from 'domain/ports/TransactionRepository';
import { DomainServiceResult } from 'domain/services/types';

export default class ListTransactions {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  public async execute(): Promise<DomainServiceResult<Transaction[]>> {
    try {
      const repoResult = await this.transactionRepository.list();

      return {
        status: 200,
        result: repoResult.data,
      };
    } catch (error: any) {
      return {
        status: 500,
        error: {
          message: error.message,
        },
      };
    }
  }
}
