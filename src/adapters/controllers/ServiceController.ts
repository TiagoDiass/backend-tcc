import IServiceRepository from 'domain/ports/ServiceRepository';
import {
  IRequestCreateServiceDTO,
  IRequestDeleteServiceDTO,
  IRequestGetServiceByIdDTO,
  IRequestUpdateServiceDTO,
} from 'domain/services/dto';
import {
  CreateService,
  DeleteService,
  GetServiceById,
  ListServices,
  UpdateService,
} from 'domain/services/ServiceServices';

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
          data: listServicesResponse.status === 200 ? listServicesResponse.result : [],
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao listar serviços: ${error.message || 'Erro sem mensagem...'}`,
        },
      };
    }
  }

  async createService(createServiceDTO: IRequestCreateServiceDTO): Promise<ControllerMethodResult> {
    const createServiceService = new CreateService(this.serviceRepository);

    try {
      const createServiceResponse = await createServiceService.execute(createServiceDTO);

      const response: ControllerMethodResult = {
        status: createServiceResponse.status,
        result: {
          message:
            createServiceResponse.status === 201
              ? 'Serviço criado com sucesso'
              : createServiceResponse.error?.message,

          data: createServiceResponse.result || null,
        },
      };

      if (createServiceResponse.status !== 201) {
        response.result.errors = createServiceResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
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

  async deleteService(deleteServiceDTO: IRequestDeleteServiceDTO): Promise<ControllerMethodResult> {
    const deleteServiceService = new DeleteService(this.serviceRepository);

    try {
      const deleteServiceResult = await deleteServiceService.execute(deleteServiceDTO);

      return {
        status: deleteServiceResult.status,
        result: {
          message:
            deleteServiceResult.status === 200
              ? 'Serviço excluído com sucesso'
              : deleteServiceResult.error?.message,

          data: deleteServiceResult.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao excluir serviço: ${error.message || 'Erro sem mensagem...'}`,
        },
      };
    }
  }

  async getServiceById(
    getServiceByIdDTO: IRequestGetServiceByIdDTO
  ): Promise<ControllerMethodResult> {
    const getServiceById = new GetServiceById(this.serviceRepository);

    try {
      const getServiceByIdResult = await getServiceById.execute(getServiceByIdDTO);

      return {
        status: getServiceByIdResult.status,
        result: {
          message:
            getServiceByIdResult.status === 200
              ? 'Serviço obtido com sucesso'
              : getServiceByIdResult.error?.message,
          data: getServiceByIdResult.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao obter serviço: ${error.message || 'Erro sem mensagem...'}`,
        },
      };
    }
  }

  async updateService(updateServiceDTO: IRequestUpdateServiceDTO): Promise<ControllerMethodResult> {
    const updateServiceService = new UpdateService(this.serviceRepository);

    try {
      const updateServiceResponse = await updateServiceService.execute(updateServiceDTO);

      const response: ControllerMethodResult = {
        status: updateServiceResponse.status,
        result: {
          message:
            updateServiceResponse.status === 200
              ? 'Serviço atualizado com sucesso'
              : updateServiceResponse.error?.message,

          data: updateServiceResponse.result || null,
        },
      };

      if (![200, 404].includes(updateServiceResponse.status)) {
        response.result.errors = updateServiceResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar a atualização de um serviço: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }
}
