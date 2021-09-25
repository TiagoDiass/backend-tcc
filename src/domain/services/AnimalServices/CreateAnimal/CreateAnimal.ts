import Animal from 'domain/entities/Animal/Animal';
import IAnimalRepository from 'domain/ports/AnimalRepository';
import { IRequestCreateAnimalDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class CreateTransaction {
  constructor(private readonly animalRepository: IAnimalRepository) {}

  public async execute(
    createAnimalDTO: IRequestCreateAnimalDTO
  ): Promise<DomainServiceResult<Animal>> {
    try {
      const animal = new Animal(createAnimalDTO);

      const repoResult = await this.animalRepository.save(animal);

      return {
        status: 201,
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
