import Service from 'domain/entities/Service/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';
import { DomainServiceResult } from 'domain/services/types';

export default class ListServices {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  public async execute(): Promise<DomainServiceResult<Service[]>> {
    try {
      const repoResult = await this.serviceRepository.list();

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
