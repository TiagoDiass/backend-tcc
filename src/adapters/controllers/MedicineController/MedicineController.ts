import IMedicineRepository from 'domain/ports/MedicineRepository';
import {
  IRequestCreateMedicineDTO,
  IRequestDeleteMedicineDTO,
  IRequestGetMedicineByIdDTO,
  IRequestUpdateMedicineDTO,
} from 'domain/services/dto';
import {
  CreateMedicine,
  DeleteMedicine,
  GetMedicineById,
  ListMedicines,
  UpdateMedicine,
} from 'domain/services/MedicineServices';

export default class MedicineController {
  constructor(private readonly medicineRepository: IMedicineRepository) {}

  async listMedicines(): Promise<ControllerMethodResult> {
    const listMedicinesService = new ListMedicines(this.medicineRepository);

    try {
      const listMedicinesResponse = await listMedicinesService.execute();

      return {
        status: listMedicinesResponse.status,
        result: {
          message:
            listMedicinesResponse.status === 200
              ? 'Lista de medicamentos obtida com sucesso'
              : listMedicinesResponse.error?.message,
          data: listMedicinesResponse.status === 200 ? listMedicinesResponse.result : [],
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao listar medicamentos: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async createMedicine(
    createMedicineDTO: IRequestCreateMedicineDTO
  ): Promise<ControllerMethodResult> {
    const createMedicineService = new CreateMedicine(this.medicineRepository);

    try {
      const createMedicineResponse = await createMedicineService.execute(createMedicineDTO);

      const response: ControllerMethodResult = {
        status: createMedicineResponse.status,
        result: {
          message:
            createMedicineResponse.status === 201
              ? 'Medicamento cadastrado com sucesso'
              : createMedicineResponse.error?.message,

          data: createMedicineResponse.result || null,
        },
      };

      if (createMedicineResponse.status !== 201) {
        response.result.errors = createMedicineResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar o cadastro de um medicamento: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async deleteMedicine(
    deleteMedicineDTO: IRequestDeleteMedicineDTO
  ): Promise<ControllerMethodResult> {
    const deleteMedicineService = new DeleteMedicine(this.medicineRepository);

    try {
      const deleteMedicineResult = await deleteMedicineService.execute(deleteMedicineDTO);

      return {
        status: deleteMedicineResult.status,
        result: {
          message:
            deleteMedicineResult.status === 200
              ? 'Medicamento excluído com sucesso'
              : deleteMedicineResult.error?.message,

          data: deleteMedicineResult.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao excluir medicamento: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async getMedicineById(
    getMedicineByIdDTO: IRequestGetMedicineByIdDTO
  ): Promise<ControllerMethodResult> {
    const getMedicineByIdService = new GetMedicineById(this.medicineRepository);

    try {
      const getMedicineByIdResponse = await getMedicineByIdService.execute(getMedicineByIdDTO);

      return {
        status: getMedicineByIdResponse.status,
        result: {
          message:
            getMedicineByIdResponse.status === 200
              ? 'Medicamento obtido com sucesso'
              : getMedicineByIdResponse.error?.message,
          data: getMedicineByIdResponse.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao obter medicamento: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async updateMedicine(
    updateMedicineDTO: IRequestUpdateMedicineDTO
  ): Promise<ControllerMethodResult> {
    const updateMedicineService = new UpdateMedicine(this.medicineRepository);

    try {
      const updateMedicineResponse = await updateMedicineService.execute(updateMedicineDTO);

      const response: ControllerMethodResult = {
        status: updateMedicineResponse.status,
        result: {
          message:
            updateMedicineResponse.status === 200
              ? 'Medicamento atualizado com sucesso'
              : updateMedicineResponse.error?.message,

          data: updateMedicineResponse.result || null,
        },
      };

      if (![200, 404].includes(updateMedicineResponse.status)) {
        response.result.errors = updateMedicineResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar a atualização de um medicamento: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }
}
