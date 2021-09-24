import Animal from 'domain/entities/Animal/Animal';
import IRepositoryMethodResult from './RepositoryMethodResult';

export default interface IAnimalRepository {
  save(animal: Animal): Promise<IRepositoryMethodResult<Animal>>;
  list(): Promise<IRepositoryMethodResult<Animal[]>>;
  findById(id: string): Promise<IRepositoryMethodResult<Animal | null>>;
  delete(id: string): Promise<IRepositoryMethodResult<Animal['id']>>;
  update(animal: Animal): Promise<IRepositoryMethodResult<Animal>>;
}
