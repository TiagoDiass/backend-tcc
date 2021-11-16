import PartnerClinic from 'domain/entities/PartnerClinic/PartnerClinic';
import IRepositoryMethodResult from './RepositoryMethodResult';

export default interface IPartnerClinicRepository {
  save(partnerClinic: PartnerClinic): Promise<IRepositoryMethodResult<PartnerClinic>>;
  list(): Promise<IRepositoryMethodResult<PartnerClinic[]>>;
  findById(id: string): Promise<IRepositoryMethodResult<PartnerClinic | null>>;
  delete(id: string): Promise<IRepositoryMethodResult<PartnerClinic['id']>>;
  update(partnerClinic: PartnerClinic): Promise<IRepositoryMethodResult<PartnerClinic>>;
}
