import ITransactionRepository from 'domain/ports/TransactionRepository';
import {
  IRequestGetTransactionByIdDTO,
  IRequestUpdateTransactionDTO,
  IRequestDeleteTransactionDTO,
  IRequestCreateTransactionDTO,
} from 'domain/services/dto';
import {
  CreateTransaction,
  DeleteTransaction,
  GetTransactionById,
  ListTransactions,
  UpdateTransaction,
} from 'domain/services/TransactionServices';

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

  async deleteTransaction(
    deleteTransactionDTO: IRequestDeleteTransactionDTO
  ): Promise<ControllerMethodResult> {
    const deleteTransactionService = new DeleteTransaction(this.transactionRepository);

    try {
      const deleteTransactionResult = await deleteTransactionService.execute(deleteTransactionDTO);

      return {
        status: deleteTransactionResult.status,
        result: {
          message:
            deleteTransactionResult.status === 200
              ? 'Transação excluída com sucesso'
              : deleteTransactionResult.error?.message,

          data: deleteTransactionResult.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao excluir transação: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async getTransactionById(
    getTransactionByIdDTO: IRequestGetTransactionByIdDTO
  ): Promise<ControllerMethodResult> {
    const getTransactionById = new GetTransactionById(this.transactionRepository);

    try {
      const getTransactionByIdResult = await getTransactionById.execute(getTransactionByIdDTO);

      return {
        status: getTransactionByIdResult.status,
        result: {
          message:
            getTransactionByIdResult.status === 200
              ? 'Transação obtida com sucesso'
              : getTransactionByIdResult.error?.message,
          data: getTransactionByIdResult.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao obter transação: ${error.message || 'Erro sem mensagem...'}`,
        },
      };
    }
  }

  async updateTransaction(
    updateTransactionDTO: IRequestUpdateTransactionDTO
  ): Promise<ControllerMethodResult> {
    const updateTransactionService = new UpdateTransaction(this.transactionRepository);

    try {
      const updateTransactionResponse = await updateTransactionService.execute(
        updateTransactionDTO
      );

      const response: ControllerMethodResult = {
        status: updateTransactionResponse.status,
        result: {
          message:
            updateTransactionResponse.status === 200
              ? 'Transação atualizada com sucesso'
              : updateTransactionResponse.error?.message,

          data: updateTransactionResponse.result || null,
        },
      };

      if (![200, 404].includes(updateTransactionResponse.status)) {
        response.result.errors = updateTransactionResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar a atualização de uma transação: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }
}
