import Transaction from 'domain/entities/Transaction/Transaction';
import ITransactionRepository from 'domain/ports/TransactionRepository';
import { DomainServiceResult } from 'domain/services/types';

type GetCurrentBalanceResult = {
  total: number;
  entries: number;
  withdraws: number;
};

export default class GetCurrentBalance {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  public async execute(): Promise<DomainServiceResult<GetCurrentBalanceResult>> {
    try {
      const { data: transactions } = await this.transactionRepository.list();

      const totalizers = transactions.reduce(
        (ac, at) => {
          if (at.type === 'deposit') {
            ac.total += at.value;
            ac.entries += at.value;
          } else if (at.type === 'withdraw') {
            ac.total -= at.value;
            ac.withdraws += at.value;
          }

          return ac;
        },
        {
          total: 0,
          entries: 0,
          withdraws: 0,
        }
      );

      return {
        status: 200,
        result: {
          total: totalizers.total / 100, // returning it in R$ instead of only centavos
          entries: totalizers.entries / 100,
          withdraws: totalizers.withdraws / 100,
        },
      };
    } catch (error) {
      return {
        status: 500,
        error: {
          message: error.message,
        },
      };
    }
  }
}
