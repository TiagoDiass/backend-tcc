import PartnerClinic from 'domain/entities/PartnerClinic/PartnerClinic';
import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';
import { DomainServiceResult } from 'domain/services/types';

export default class ListPartnerClinics {
  constructor(private readonly partnerClinicRepository: IPartnerClinicRepository) {}

  public async execute(): Promise<DomainServiceResult<PartnerClinic[]>> {
    try {
      const repoResult = await this.partnerClinicRepository.list();

      return {
        status: 200,
        result: repoResult.data,
      };
    } catch (error: any) {
      return {
        status: 500,
        error: {
          message: error.message,
        },
      };
    }
  }
}
