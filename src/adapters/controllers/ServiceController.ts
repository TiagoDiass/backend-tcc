import IServiceRepository from 'domain/ports/ServiceRepository';
import { IRequestCreateServiceDTO } from 'domain/services/dto';
import { CreateService, ListServices } from 'domain/services/ServiceServices';

type ControllerMethodResult = {
  status: number;
  result: {
    message: string;
    data?: any;
    errors?: string[];
  };
};

export default class ServiceController {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async listServices(): Promise<ControllerMethodResult> {
    const listServicesService = new ListServices(this.serviceRepository);

    try {
      const listServicesResponse = await listServicesService.execute();

      return {
        status: listServicesResponse.status,
        result: {
          message:
            listServicesResponse.status === 200
              ? 'Lista de serviços obtida com sucesso'
              : listServicesResponse.error?.message,
          data:
            listServicesResponse.status === 200
              ? listServicesResponse.result
              : [],
        },
      };
    } catch (error) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao listar serviços: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async createService(
    createServiceDTO: IRequestCreateServiceDTO
  ): Promise<ControllerMethodResult> {
    const createServiceService = new CreateService(this.serviceRepository);

    try {
      const createServiceResponse = await createServiceService.execute(
        createServiceDTO
      );

      const response: ControllerMethodResult = {
        status: createServiceResponse.status,
        result: {
          message:
            createServiceResponse.status === 201
              ? 'Serviço criado com sucesso'
              : createServiceResponse.error?.message,
        },
      };

      if (createServiceResponse.status === 201) {
        response.result.data = createServiceResponse.result;
      } else {
        response.result.errors = createServiceResponse.error?.errorsList;
      }

      return response;
    } catch (error) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar a criação de um serviço: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }
}
