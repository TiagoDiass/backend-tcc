import Medicine from 'domain/entities/Medicine/Medicine';
import IMedicineRepository from 'domain/ports/MedicineRepository';
import { IRequestCreateMedicineDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class CreateMedicine {
  constructor(private readonly medicineRepository: IMedicineRepository) {}

  public async execute(
    createMedicineDTO: IRequestCreateMedicineDTO
  ): Promise<DomainServiceResult<Medicine>> {
    try {
      const medicine = new Medicine(createMedicineDTO);

      const repoResult = await this.medicineRepository.save(medicine);

      return {
        status: 201,
        result: repoResult.data,
      };
    } catch (error: any) {
      const isInvalidMedicineError = error.type === 'invalid-medicine-error';

      return {
        status: isInvalidMedicineError ? 400 : 500,
        error: {
          message: error.message,
          errorsList: isInvalidMedicineError ? error.errorsList : [],
        },
      };
    }
  }
}
