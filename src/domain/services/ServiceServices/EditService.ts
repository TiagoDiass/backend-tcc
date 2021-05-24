import Service from 'domain/entities/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';
import { IRequestEditServiceDTO } from '../dto';
import { DomainServiceResult } from '../types';

export default class EditService {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(editServiceDTO: IRequestEditServiceDTO): Promise<DomainServiceResult<Service>> {
    try {
      const { data: serviceExists } = await this.serviceRepository.findById(editServiceDTO.id);

      if (!serviceExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum serviço cadastrado com o ID informado',
          },
        };
      }

      const editedService = new Service(editServiceDTO);

      const repoResult = await this.serviceRepository.update(editedService);

      return {
        status: 200,
        result: repoResult.data,
      };
    } catch (error) {
      const isInvalidServiceError = error.type === 'invalid-service-error';

      return {
        status: isInvalidServiceError ? 400 : 500,
        error: {
          message: error.message,
          errorsList: isInvalidServiceError ? error.errorsList : [],
        },
      };
    }
  }
}
