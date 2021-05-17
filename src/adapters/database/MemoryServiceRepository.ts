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

  findById(id: string): Promise<IRepositoryMethodResult<Service | null>> {
    return new Promise(resolve => {
      const foundService = this.services.find(service => service.id === id);

      resolve({
        status: foundService ? 200 : 404,
        data: foundService || null,
      });
    });
  }

  delete(id: string): Promise<IRepositoryMethodResult<string>> {
    return new Promise(resolve => {
      const indexOfServiceToBeDeleted = this.services.findIndex(
        service => service.id === id
      );

      const [deletedService] = this.services.splice(
        indexOfServiceToBeDeleted,
        1
      );

      resolve({
        status: 200,
        data: deletedService.id,
      });
    });
  }
}
