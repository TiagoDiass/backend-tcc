import Service from 'domain/entities/Service/Service';
import IRepositoryMethodResult from './RepositoryMethodResult';

export default interface IServiceRepository {
  save(service: Service): Promise<IRepositoryMethodResult<Service>>;
  list(): Promise<IRepositoryMethodResult<Service[]>>;
  findById(id: string): Promise<IRepositoryMethodResult<Service | null>>;
  delete(id: string): Promise<IRepositoryMethodResult<Service['id']>>;
  update(service: Service): Promise<IRepositoryMethodResult<Service>>;
}
