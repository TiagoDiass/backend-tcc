import Animal from 'domain/entities/Animal/Animal';
import IAnimalRepository from 'domain/ports/AnimalRepository';
import { IRequestDeleteAnimalDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class DeleteAnimal {
  constructor(private readonly animalRepository: IAnimalRepository) {}

  async execute(
    deleteAnimalDTO: IRequestDeleteAnimalDTO
  ): Promise<DomainServiceResult<Animal['id']>> {
    try {
      const { data: animalExists } = await this.animalRepository.findById(deleteAnimalDTO.id);

      if (!animalExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum animal cadastrado com o ID informado',
          },
        };
      }

      const repoResult = await this.animalRepository.delete(deleteAnimalDTO.id);

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
