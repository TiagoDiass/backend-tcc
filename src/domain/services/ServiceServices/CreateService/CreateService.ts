import Service from 'domain/entities/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';
import { IRequestCreateServiceDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class CreateService {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  public async execute(
    createServiceDTO: IRequestCreateServiceDTO
  ): Promise<DomainServiceResult<Service>> {
    try {
      const service = new Service(createServiceDTO);

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
