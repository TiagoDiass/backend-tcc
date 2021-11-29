import IHelpCaseRepository from 'domain/ports/HelpCaseRepository';
import {
  IRequestGetHelpCaseByIdDTO,
  IRequestUpdateHelpCaseDTO,
  IRequestDeleteHelpCaseDTO,
  IRequestCreateHelpCaseDTO,
} from 'domain/services/dto';
import {
  CreateHelpCase,
  DeleteHelpCase,
  GetHelpCaseById,
  ListHelpCases,
  UpdateHelpCase,
} from 'domain/services/HelpCaseServices';

export default class HelpCaseController {
  constructor(private readonly helpCaseRepository: IHelpCaseRepository) {}

  async listHelpCases(): Promise<ControllerMethodResult> {
    const listHelpCasesService = new ListHelpCases(this.helpCaseRepository);

    try {
      const listHelpCasesResponse = await listHelpCasesService.execute();

      return {
        status: listHelpCasesResponse.status,
        result: {
          message:
            listHelpCasesResponse.status === 200
              ? 'Lista de casos de ajuda obtida com sucesso'
              : listHelpCasesResponse.error?.message,
          data: listHelpCasesResponse.status === 200 ? listHelpCasesResponse.result : [],
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao listar casos de ajuda: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async createHelpCase(
    createHelpCaseDTO: IRequestCreateHelpCaseDTO
  ): Promise<ControllerMethodResult> {
    const createHelpCaseService = new CreateHelpCase(this.helpCaseRepository);

    try {
      const createHelpCaseResponse = await createHelpCaseService.execute(createHelpCaseDTO);

      const response: ControllerMethodResult = {
        status: createHelpCaseResponse.status,
        result: {
          message:
            createHelpCaseResponse.status === 201
              ? 'Caso de ajuda cadastrado com sucesso'
              : createHelpCaseResponse.error?.message,

          data: createHelpCaseResponse.result || null,
        },
      };

      if (createHelpCaseResponse.status !== 201) {
        response.result.errors = createHelpCaseResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar o cadastro de um caso de ajuda: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async deleteHelpCase(
    deleteHelpCaseDTO: IRequestDeleteHelpCaseDTO
  ): Promise<ControllerMethodResult> {
    const deleteHelpCaseService = new DeleteHelpCase(this.helpCaseRepository);

    try {
      const deleteHelpCaseResult = await deleteHelpCaseService.execute(deleteHelpCaseDTO);

      return {
        status: deleteHelpCaseResult.status,
        result: {
          message:
            deleteHelpCaseResult.status === 200
              ? 'Caso de ajuda excluído com sucesso'
              : deleteHelpCaseResult.error?.message,

          data: deleteHelpCaseResult.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao excluir caso de ajuda: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async getHelpCaseById(
    getHelpCaseByIdDTO: IRequestGetHelpCaseByIdDTO
  ): Promise<ControllerMethodResult> {
    const getHelpCaseById = new GetHelpCaseById(this.helpCaseRepository);

    try {
      const getHelpCaseByIdResult = await getHelpCaseById.execute(getHelpCaseByIdDTO);

      return {
        status: getHelpCaseByIdResult.status,
        result: {
          message:
            getHelpCaseByIdResult.status === 200
              ? 'Caso de ajuda obtido com sucesso'
              : getHelpCaseByIdResult.error?.message,
          data: getHelpCaseByIdResult.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao obter caso de ajuda: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async updateHelpCase(
    updateHelpCaseDTO: IRequestUpdateHelpCaseDTO
  ): Promise<ControllerMethodResult> {
    const updateHelpCaseService = new UpdateHelpCase(this.helpCaseRepository);

    try {
      const updateHelpCaseResponse = await updateHelpCaseService.execute(updateHelpCaseDTO);

      const response: ControllerMethodResult = {
        status: updateHelpCaseResponse.status,
        result: {
          message:
            updateHelpCaseResponse.status === 200
              ? 'Caso de ajuda atualizado com sucesso'
              : updateHelpCaseResponse.error?.message,

          data: updateHelpCaseResponse.result || null,
        },
      };

      if (![200, 404].includes(updateHelpCaseResponse.status)) {
        response.result.errors = updateHelpCaseResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar a atualização de um caso de ajuda: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }
}
