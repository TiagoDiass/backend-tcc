import Service from 'domain/entities/Service';
import InvalidServiceError from 'domain/exceptions/InvalidServiceError';
import IServiceRepository from 'domain/ports/ServiceRepository';
import { ServiceDTO } from './dto';
import { DomainServiceResult } from './types';

export default class CreateService {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  public async execute(
    serviceDTO: ServiceDTO
  ): Promise<DomainServiceResult<Service>> {
    try {
      const service = new Service(serviceDTO);

      const repoResult = await this.serviceRepository.save(service);

      return {
        status: 201,
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
