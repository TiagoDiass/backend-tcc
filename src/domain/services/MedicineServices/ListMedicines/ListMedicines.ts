import Medicine from 'domain/entities/Medicine/Medicine';
import IMedicineRepository from 'domain/ports/MedicineRepository';
import { DomainServiceResult } from 'domain/services/types';

export default class ListMedicines {
  constructor(private readonly medicineRepository: IMedicineRepository) {}

  public async execute(): Promise<DomainServiceResult<Medicine[]>> {
    try {
      const repoResult = await this.medicineRepository.list();

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
