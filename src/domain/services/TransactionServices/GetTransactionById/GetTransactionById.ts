import Transaction from 'domain/entities/Transaction/Transaction';
import ITransactionRepository from 'domain/ports/TransactionRepository';
import { IRequestGetTransactionByIdDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class GetTransactionById {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  public async execute(
    getTransactionByIdDTO: IRequestGetTransactionByIdDTO
  ): Promise<DomainServiceResult<Transaction>> {
    try {
      const { data: transaction } = await this.transactionRepository.findById(
        getTransactionByIdDTO.id
      );

      if (!transaction) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhuma transação cadastrada com o ID informado',
          },
        };
      }

      return {
        status: 200,
        result: transaction,
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
