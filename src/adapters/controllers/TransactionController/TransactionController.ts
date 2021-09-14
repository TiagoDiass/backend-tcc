import ITransactionRepository from 'domain/ports/TransactionRepository';
import {
  IRequestGetTransactionByIdDTO,
  IRequestUpdateTransactionDTO,
  IRequestDeleteTransactionDTO,
  IRequestCreateTransactionDTO,
} from 'domain/services/dto';
import { CreateTransaction, ListTransactions } from 'domain/services/TransactionServices';

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

  async createTransaction(
    createTransactionDTO: IRequestCreateTransactionDTO
  ): Promise<ControllerMethodResult> {
    const createTransactionService = new CreateTransaction(this.transactionRepository);

    try {
      const createTransactionResponse = await createTransactionService.execute(
        createTransactionDTO
      );

      const response: ControllerMethodResult = {
        status: createTransactionResponse.status,
        result: {
          message:
            createTransactionResponse.status === 201
              ? 'Transação criada com sucesso'
              : createTransactionResponse.error?.message,

          data: createTransactionResponse.result || null,
        },
      };

      if (createTransactionResponse.status !== 201) {
        response.result.errors = createTransactionResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar a criação de uma transação: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }
}
