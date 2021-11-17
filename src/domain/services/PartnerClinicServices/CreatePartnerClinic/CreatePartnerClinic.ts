import PartnerClinic from 'domain/entities/PartnerClinic/PartnerClinic';
import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';
import { IRequestCreatePartnerClinicDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';
import { Address } from 'domain/valueObjects';

export default class CreatePartnerClinic {
  constructor(private readonly partnerClinicRepository: IPartnerClinicRepository) {}

  public async execute(
    createPartnerClinicDTO: IRequestCreatePartnerClinicDTO
  ): Promise<DomainServiceResult<PartnerClinic>> {
    try {
      const address = new Address(createPartnerClinicDTO.address);

      const partnerClinic = new PartnerClinic({ ...createPartnerClinicDTO, address });

      const repoResult = await this.partnerClinicRepository.save(partnerClinic);

      return {
        status: 201,
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
