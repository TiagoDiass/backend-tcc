import IAnimalRepository from 'domain/ports/AnimalRepository';
import {
  ListAnimals,
  CreateAnimal,
  DeleteAnimal,
  GetAnimalById,
  UpdateAnimal,
} from 'domain/services/AnimalServices';
import {
  IRequestCreateAnimalDTO,
  IRequestDeleteAnimalDTO,
  IRequestGetAnimalByIdDTO,
  IRequestUpdateAnimalDTO,
} from 'domain/services/dto';

export default class AnimalController {
  constructor(private readonly animalRepository: IAnimalRepository) {}

  async listAnimals(): Promise<ControllerMethodResult> {
    const listAnimalsService = new ListAnimals(this.animalRepository);

    try {
      const listAnimalsResponse = await listAnimalsService.execute();

      return {
        status: listAnimalsResponse.status,
        result: {
          message:
            listAnimalsResponse.status === 200
              ? 'Lista de animais obtida com sucesso'
              : listAnimalsResponse.error?.message,
          data: listAnimalsResponse.status === 200 ? listAnimalsResponse.result : [],
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao listar animais: ${error.message || 'Erro sem mensagem...'}`,
        },
      };
    }
  }

  async createAnimal(createAnimalDTO: IRequestCreateAnimalDTO): Promise<ControllerMethodResult> {
    const createAnimalService = new CreateAnimal(this.animalRepository);

    try {
      const createAnimalResponse = await createAnimalService.execute(createAnimalDTO);

      const response: ControllerMethodResult = {
        status: createAnimalResponse.status,
        result: {
          message:
            createAnimalResponse.status === 201
              ? 'Animal criado com sucesso'
              : createAnimalResponse.error?.message,

          data: createAnimalResponse.result || null,
        },
      };

      if (createAnimalResponse.status !== 201) {
        response.result.errors = createAnimalResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar a criação de um animal: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }

  async deleteAnimal(deleteAnimalDTO: IRequestDeleteAnimalDTO): Promise<ControllerMethodResult> {
    const deleteAnimalService = new DeleteAnimal(this.animalRepository);

    try {
      const deleteAnimalResponse = await deleteAnimalService.execute(deleteAnimalDTO);

      return {
        status: deleteAnimalResponse.status,
        result: {
          message:
            deleteAnimalResponse.status === 200
              ? 'Animal excluído com sucesso'
              : deleteAnimalResponse.error?.message,

          data: deleteAnimalResponse.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao excluir animal: ${error.message || 'Erro sem mensagem...'}`,
        },
      };
    }
  }

  async getAnimalById(getAnimalByIdDTO: IRequestGetAnimalByIdDTO): Promise<ControllerMethodResult> {
    const getAnimalByIdService = new GetAnimalById(this.animalRepository);

    try {
      const getAnimalByIdResponse = await getAnimalByIdService.execute(getAnimalByIdDTO);

      return {
        status: getAnimalByIdResponse.status,
        result: {
          message:
            getAnimalByIdResponse.status === 200
              ? 'Animal obtido com sucesso'
              : getAnimalByIdResponse.error?.message,
          data: getAnimalByIdResponse.result || null,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao obter animal: ${error.message || 'Erro sem mensagem...'}`,
        },
      };
    }
  }

  async updateAnimal(updateAnimalDTO: IRequestUpdateAnimalDTO): Promise<ControllerMethodResult> {
    const updateAnimalService = new UpdateAnimal(this.animalRepository);

    try {
      const updateAnimalResponse = await updateAnimalService.execute(updateAnimalDTO);

      const response: ControllerMethodResult = {
        status: updateAnimalResponse.status,
        result: {
          message:
            updateAnimalResponse.status === 200
              ? 'Animal atualizado com sucesso'
              : updateAnimalResponse.error?.message,

          data: updateAnimalResponse.result || null,
        },
      };

      if (![200, 404].includes(updateAnimalResponse.status)) {
        response.result.errors = updateAnimalResponse.error?.errorsList;
      }

      return response;
    } catch (error: any) {
      return {
        status: 500,
        result: {
          message: `Erro inesperado ao executar a atualização de um animal: ${
            error.message || 'Erro sem mensagem...'
          }`,
        },
      };
    }
  }
}
