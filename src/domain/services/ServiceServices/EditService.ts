import Service from 'domain/entities/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';
import { IRequestEditServiceDTO } from '../dto';
import { DomainServiceResult } from '../types';

export default class EditService {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(
    editServiceDTO: IRequestEditServiceDTO
  ): Promise<DomainServiceResult<Service>> {
    try {
      const { data: serviceExists } = await this.serviceRepository.findById(
        editServiceDTO.id
      );

      if (!serviceExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum serviço cadastrado com o ID informado',
          },
        };
      }
    } catch (error) {
      return {
        status: 500,
        error: {
          message: error.message,
        },
      };
    }
  }
}
