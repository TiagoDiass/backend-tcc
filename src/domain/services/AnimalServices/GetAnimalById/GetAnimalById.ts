import Animal from 'domain/entities/Animal/Animal';
import IAnimalRepository from 'domain/ports/AnimalRepository';
import { IRequestGetAnimalByIdDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class GetAnimalById {
  constructor(private readonly animalRepository: IAnimalRepository) {}

  public async execute(
    getAnimalByIdDTO: IRequestGetAnimalByIdDTO
  ): Promise<DomainServiceResult<Animal>> {
    try {
      const { data: animal } = await this.animalRepository.findById(getAnimalByIdDTO.id);

      if (!animal) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum animal cadastrado com o ID informado',
          },
        };
      }

      return {
        status: 200,
        result: animal,
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
