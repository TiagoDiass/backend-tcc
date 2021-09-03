import Transaction from 'domain/entities/Transaction/Transaction';
import IRepositoryMethodResult from './RepositoryMethodResult';

export default interface ITransactionRepository {
  save(transaction: Transaction): Promise<IRepositoryMethodResult<Transaction>>;
  list(): Promise<IRepositoryMethodResult<Transaction[]>>;
  findById(id: string): Promise<IRepositoryMethodResult<Transaction | null>>;
  delete(id: string): Promise<IRepositoryMethodResult<Transaction['id']>>;
  update(transaction: Transaction): Promise<IRepositoryMethodResult<Transaction>>;
}
