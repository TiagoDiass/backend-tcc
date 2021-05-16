import Service from 'domain/entities/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';

export default class CreateService {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  public async execute(service: Service): Promise<Service> {
    const repoResult = await this.serviceRepository.save(service);

    return repoResult.data;
  }
}
