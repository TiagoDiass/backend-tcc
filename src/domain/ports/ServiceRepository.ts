import Service from 'domain/entities/Service';
import IRepositoryMethodResult from './RepositoryMethodResult';

export default interface IServiceRepository {
  save(service: Service): Promise<IRepositoryMethodResult<Service>>;
  list(): Promise<IRepositoryMethodResult<Service[]>>;
  findById(id: string): Promise<IRepositoryMethodResult<Service | null>>;
  delete(id: string): Promise<IRepositoryMethodResult<Service['id']>>;
  edit(service: Service): Promise<IRepositoryMethodResult<Service>>;
}
