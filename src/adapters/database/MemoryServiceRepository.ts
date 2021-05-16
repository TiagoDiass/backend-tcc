import Service from 'domain/entities/Service';
import IRepositoryMethodResult from 'domain/ports/RepositoryMethodResult';
import IServiceRepository from 'domain/ports/ServiceRepository';

export default class MemoryServiceRepository implements IServiceRepository {
  private services: Service[] = [
    new Service({ title: 'Serviço 1', description: 'Descrição 1' }),
    new Service({ title: 'Serviço 2', description: 'Descrição 2' }),
  ];

  save(service: Service): Promise<IRepositoryMethodResult<Service>> {
    this.services.push(service);

    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        data: this.services[this.services.length - 1],
      });
    });
  }

  list(): Promise<IRepositoryMethodResult<Service[]>> {
    return new Promise(resolve => {
      resolve({
        status: 200,
        data: this.services,
      });
    });
  }
}
