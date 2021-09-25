import Animal from 'domain/entities/Animal/Animal';
import IAnimalRepository from 'domain/ports/AnimalRepository';
import { IRequestUpdateAnimalDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class UpdateAnimal {
  constructor(private readonly animalRepository: IAnimalRepository) {}

  async execute(updateAnimalDTO: IRequestUpdateAnimalDTO): Promise<DomainServiceResult<Animal>> {
    try {
      const { data: animalExists } = await this.animalRepository.findById(updateAnimalDTO.id);

      if (!animalExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum animal cadastrado com o ID informado',
          },
        };
      }

      const updatedAnimal = new Animal(updateAnimalDTO);

      const repoResult = await this.animalRepository.update(updatedAnimal);

      return {
        status: 200,
        result: repoResult.data,
      };
    } catch (error: any) {
      const isInvalidAnimalError = error.type === 'invalid-animal-error';

      return {
        status: isInvalidAnimalError ? 400 : 500,
        error: {
          message: error.message,
          errorsList: isInvalidAnimalError ? error.errorsList : [],
        },
      };
    }
  }
}
