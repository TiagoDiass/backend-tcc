import Service from 'domain/entities/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';

export default class ListServices {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  public async execute(): Promise<Service[]> {
    const repoResult = await this.serviceRepository.list();

    return repoResult.data;
  }
}
