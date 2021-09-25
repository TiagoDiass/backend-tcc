import IAnimalRepository from 'domain/ports/AnimalRepository';
import { ListAnimals, CreateAnimal } from 'domain/services/AnimalServices';
import { IRequestCreateAnimalDTO } from 'domain/services/dto';

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
}
