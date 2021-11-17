import PartnerClinic from 'domain/entities/PartnerClinic/PartnerClinic';
import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';
import { IRequestDeletePartnerClinicDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class DeletePartnerClinic {
  constructor(private readonly partnerClinicRepository: IPartnerClinicRepository) {}

  async execute(
    deletePartnerClinicDTO: IRequestDeletePartnerClinicDTO
  ): Promise<DomainServiceResult<PartnerClinic['id']>> {
    try {
      const { data: clinicExists } = await this.partnerClinicRepository.findById(
        deletePartnerClinicDTO.id
      );

      if (!clinicExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhuma clínica parceira cadastrada com o ID informado',
          },
        };
      }

      const repoResult = await this.partnerClinicRepository.delete(deletePartnerClinicDTO.id);

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
