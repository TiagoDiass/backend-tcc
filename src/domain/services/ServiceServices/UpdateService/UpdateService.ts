import Service from 'domain/entities/Service/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';
import { IRequestUpdateServiceDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class UpdateService {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(updateServiceDTO: IRequestUpdateServiceDTO): Promise<DomainServiceResult<Service>> {
    try {
      const { data: serviceExists } = await this.serviceRepository.findById(updateServiceDTO.id);

      if (!serviceExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum serviço cadastrado com o ID informado',
          },
        };
      }

      const editedService = new Service(updateServiceDTO);

      const repoResult = await this.serviceRepository.update(editedService);

      return {
        status: 200,
        result: repoResult.data,
      };
    } catch (error: any) {
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
