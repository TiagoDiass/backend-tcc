import PartnerClinic from 'domain/entities/PartnerClinic/PartnerClinic';
import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';
import { IRequestUpdatePartnerClinicDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';
import { Address } from 'domain/valueObjects';

export default class UpdatePartnerClinic {
  constructor(private readonly partnerClinicRepository: IPartnerClinicRepository) {}

  async execute(
    updatePartnerClinicDTO: IRequestUpdatePartnerClinicDTO
  ): Promise<DomainServiceResult<PartnerClinic>> {
    try {
      const { data: partnerClinicExists } = await this.partnerClinicRepository.findById(
        updatePartnerClinicDTO.id
      );

      if (!partnerClinicExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhuma clínica parceira cadastrada com o ID informado',
          },
        };
      }

      const address = new Address(updatePartnerClinicDTO.address);

      const updatedPartnerClinic = new PartnerClinic({ ...updatePartnerClinicDTO, address });

      const repoResult = await this.partnerClinicRepository.update(updatedPartnerClinic);

      return {
        status: 200,
        result: repoResult.data,
      };
    } catch (error: any) {
      const isInvalidPartnerClinicError = error.type === 'invalid-partner-clinic-error';
      const isInvalidAddressError = error.type === 'invalid-address-error';

      return {
        status: isInvalidPartnerClinicError || isInvalidAddressError ? 400 : 500,
        error: {
          message: error.message,
          errorsList: isInvalidPartnerClinicError || isInvalidAddressError ? error.errorsList : [],
        },
      };
    }
  }
}
