import Service from 'domain/entities/Service';
import IRepositoryMethodResult from './RepositoryMethodResult';

export default interface IServiceRepository {
  save(service: Service): Promise<IRepositoryMethodResult<any>>;
  list(): Promise<IRepositoryMethodResult<Service[]>>;
}
