import Transaction from 'domain/entities/Transaction/Transaction';
import ITransactionRepository from 'domain/ports/TransactionRepository';
import { IRequestDeleteTransactionDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class DeleteTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(
    deleteTransactionDTO: IRequestDeleteTransactionDTO
  ): Promise<DomainServiceResult<Transaction['id']>> {
    try {
      const { data: transactionExists } = await this.transactionRepository.findById(
        deleteTransactionDTO.id
      );

      if (!transactionExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhuma transação cadastrada com o ID informado',
          },
        };
      }

      const repoResult = await this.transactionRepository.delete(deleteTransactionDTO.id);

      return {
        status: 200,
        result: repoResult.data,
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
