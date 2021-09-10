import Transaction from 'domain/entities/Transaction/Transaction';
import ITransactionRepository from 'domain/ports/TransactionRepository';
import { IRequestCreateTransactionDTO, IRequestUpdateTransactionDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class CreateTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(
    updateTransactionDTO: IRequestUpdateTransactionDTO
  ): Promise<DomainServiceResult<Transaction>> {
    try {
      const { data: transactionExists } = await this.transactionRepository.findById(
        updateTransactionDTO.id
      );

      if (!transactionExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhuma transação cadastrada com o ID informado',
          },
        };
      }

      const updatedTransaction = new Transaction(updateTransactionDTO);

      const repoResult = await this.transactionRepository.update(updatedTransaction);

      return {
        status: 200,
        result: repoResult.data,
      };
    } catch (error) {
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
