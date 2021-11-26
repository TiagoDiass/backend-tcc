import HelpCase from 'domain/entities/HelpCase/HelpCase';
import IRepositoryMethodResult from './RepositoryMethodResult';

export default interface IHelpCaseRepository {
  save(helpCase: HelpCase): Promise<IRepositoryMethodResult<HelpCase>>;
  list(): Promise<IRepositoryMethodResult<HelpCase[]>>;
  findById(id: string): Promise<IRepositoryMethodResult<HelpCase | null>>;
  delete(id: string): Promise<IRepositoryMethodResult<HelpCase['id']>>;
  update(helpCase: HelpCase): Promise<IRepositoryMethodResult<HelpCase>>;
}
