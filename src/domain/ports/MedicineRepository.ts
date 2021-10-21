import Medicine from 'domain/entities/Medicine/Medicine';
import IRepositoryMethodResult from './RepositoryMethodResult';

export default interface IMedicineRepository {
  save(medicine: Medicine): Promise<IRepositoryMethodResult<Medicine>>;
  list(): Promise<IRepositoryMethodResult<Medicine[]>>;
  findById(id: string): Promise<IRepositoryMethodResult<Medicine | null>>;
  delete(id: string): Promise<IRepositoryMethodResult<Medicine['id']>>;
  update(medicine: Medicine): Promise<IRepositoryMethodResult<Medicine>>;
}
