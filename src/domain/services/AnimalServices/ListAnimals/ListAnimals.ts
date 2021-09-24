import Animal from 'domain/entities/Animal/Animal';
import IAnimalRepository from 'domain/ports/AnimalRepository';
import { DomainServiceResult } from 'domain/services/types';

export default class ListAnimals {
  constructor(private readonly animalRepository: IAnimalRepository) {}

  public async execute(): Promise<DomainServiceResult<Animal[]>> {
    try {
      const repoResult = await this.animalRepository.list();

      return {
        status: 200,
        result: repoResult.data,
      };
    } catch (error: any) {
      return {
        status: 500,
        error: {
          message: error.message,
        },
      };
    }
  }
}
