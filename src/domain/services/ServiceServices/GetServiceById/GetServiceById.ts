import Service from 'domain/entities/Service/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';
import { IRequestGetServiceByIdDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class GetServiceById {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(
    getServiceByIdDTO: IRequestGetServiceByIdDTO
  ): Promise<DomainServiceResult<Service>> {
    try {
      const { data: service } = await this.serviceRepository.findById(getServiceByIdDTO.id);

      if (!service) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum serviço cadastrado com o ID informado',
          },
        };
      }

      return {
        status: 200,
        result: service,
      };
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
