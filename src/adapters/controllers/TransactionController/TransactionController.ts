import ITransactionRepository from 'domain/ports/TransactionRepository';
import {
  IRequestCreateServiceDTO,
  IRequestGetTransactionByIdDTO,
  IRequestUpdateTransactionDTO,
  IRequestDeleteTransactionDTO,
} from 'domain/services/dto';
import { ListTransactions } from 'domain/services/TransactionServices';

export default class TransactionController {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async listTransactions(): Promise<ControllerMethodResult> {
    const listTransactionsService = new ListTransactions(this.transactionRepository);

    try {
      const listTransactionsResponse = await listTransactionsService.execute();

      return {
        status: listTransactionsResponse.status,
        result: {
          message:
            listTransactionsResponse.status === 200
              ? 'Lista de transações obtida com sucesso'
              : listTransactionsResponse.error?.message,
          data: listTransactionsResponse.status === 200 ? listTransactionsResponse.result : [],
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao listar transações: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }
}
