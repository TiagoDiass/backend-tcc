import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';
import {
  IRequestCreatePartnerClinicDTO,
  IRequestDeletePartnerClinicDTO,
  IRequestGetPartnerClinicByIdDTO,
  IRequestUpdatePartnerClinicDTO,
} from 'domain/services/dto';
import {
  CreatePartnerClinic,
  DeletePartnerClinic,
  GetPartnerClinicById,
  ListPartnerClinics,
  UpdatePartnerClinic,
} from 'domain/services/PartnerClinicServices';

export default class PartnerClinicController {
  constructor(private readonly partnerClinicRepository: IPartnerClinicRepository) {}

  async listPartnerClinics(): Promise<ControllerMethodResult> {
    const listPartnerClinicsService = new ListPartnerClinics(this.partnerClinicRepository);

    try {
      const listPartnerClinicsResponse = await listPartnerClinicsService.execute();

      return {
        status: listPartnerClinicsResponse.status,
        result: {
          message:
            listPartnerClinicsResponse.status === 200
              ? 'Lista de clínicas parceiras obtida com sucesso'
              : listPartnerClinicsResponse.error?.message,
          data: listPartnerClinicsResponse.status === 200 ? listPartnerClinicsResponse.result : [],
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao listar clínicas parceiras: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async createPartnerClinic(
    createPartnerClinicDTO: IRequestCreatePartnerClinicDTO
  ): Promise<ControllerMethodResult> {
    const createPartnerClinicService = new CreatePartnerClinic(this.partnerClinicRepository);

    try {
      const createPartnerClinicResponse = await createPartnerClinicService.execute(
        createPartnerClinicDTO
      );

      const response: ControllerMethodResult = {
        status: createPartnerClinicResponse.status,
        result: {
          message:
            createPartnerClinicResponse.status === 201
              ? 'Clínica parceira cadastrada com sucesso'
              : createPartnerClinicResponse.error?.message,

          data: createPartnerClinicResponse.result || null,
        },
      };

      if (createPartnerClinicResponse.status !== 201) {
        response.result.errors = createPartnerClinicResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar o cadastro de uma clínica parceira: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async deletePartnerClinic(
    deletePartnerClinicDTO: IRequestDeletePartnerClinicDTO
  ): Promise<ControllerMethodResult> {
    const deletePartnerClinicService = new DeletePartnerClinic(this.partnerClinicRepository);

    try {
      const deletePartnerClinicResponse = await deletePartnerClinicService.execute(
        deletePartnerClinicDTO
      );

      return {
        status: deletePartnerClinicResponse.status,
        result: {
          message:
            deletePartnerClinicResponse.status === 200
              ? 'Clínica parceira excluída com sucesso'
              : deletePartnerClinicResponse.error?.message,

          data: deletePartnerClinicResponse.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao excluir clínica parceira: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async getPartnerClinicById(
    getPartnerClinicByIdDTO: IRequestGetPartnerClinicByIdDTO
  ): Promise<ControllerMethodResult> {
    const getPartnerClinicByIdService = new GetPartnerClinicById(this.partnerClinicRepository);

    try {
      const getPartnerClinicByIdResponse = await getPartnerClinicByIdService.execute(
        getPartnerClinicByIdDTO
      );

      return {
        status: getPartnerClinicByIdResponse.status,
        result: {
          message:
            getPartnerClinicByIdResponse.status === 200
              ? 'Clínica parceira obtida com sucesso'
              : getPartnerClinicByIdResponse.error?.message,
          data: getPartnerClinicByIdResponse.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao obter clínica parceira: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async updatePartnerClinic(
    updatePartnerClinicDTO: IRequestUpdatePartnerClinicDTO
  ): Promise<ControllerMethodResult> {
    const updatePartnerClinicService = new UpdatePartnerClinic(this.partnerClinicRepository);

    try {
      const updatePartnerClinicResponse = await updatePartnerClinicService.execute(
        updatePartnerClinicDTO
      );

      const response: ControllerMethodResult = {
        status: updatePartnerClinicResponse.status,
        result: {
          message:
            updatePartnerClinicResponse.status === 200
              ? 'Clínica parceira atualizada com sucesso'
              : updatePartnerClinicResponse.error?.message,

          data: updatePartnerClinicResponse.result || null,
        },
      };

      if (![200, 404].includes(updatePartnerClinicResponse.status)) {
        response.result.errors = updatePartnerClinicResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar a atualização de uma clínica parceira: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }
}
