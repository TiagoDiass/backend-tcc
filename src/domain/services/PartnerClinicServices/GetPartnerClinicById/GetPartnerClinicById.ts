import PartnerClinic from 'domain/entities/PartnerClinic/PartnerClinic';
import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';
import { IRequestGetPartnerClinicByIdDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class GetPartnerClinicById {
  constructor(private readonly partnerClinicRepository: IPartnerClinicRepository) {}

  public async execute(
    getPartnerClinicByIdDTO: IRequestGetPartnerClinicByIdDTO
  ): Promise<DomainServiceResult<PartnerClinic>> {
    try {
      const { data: clinic } = await this.partnerClinicRepository.findById(
        getPartnerClinicByIdDTO.id
      );

      if (!clinic) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhuma clínica parceira cadastrada com o ID informado',
          },
        };
      }

      return {
        status: 200,
        result: clinic,
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
