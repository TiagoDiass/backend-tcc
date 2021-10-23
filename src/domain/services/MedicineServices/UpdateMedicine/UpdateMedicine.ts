import Medicine from 'domain/entities/Medicine/Medicine';
import IMedicineRepository from 'domain/ports/MedicineRepository';
import { IRequestUpdateMedicineDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class UpdateMedicine {
  constructor(private readonly medicineRepository: IMedicineRepository) {}

  async execute(
    updateMedicineDTO: IRequestUpdateMedicineDTO
  ): Promise<DomainServiceResult<Medicine>> {
    try {
      const { data: medicineExists } = await this.medicineRepository.findById(updateMedicineDTO.id);

      if (!medicineExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum medicamento cadastrado com o ID informado',
          },
        };
      }

      const updatedMedicine = new Medicine(updateMedicineDTO);

      const repoResult = await this.medicineRepository.update(updatedMedicine);

      return {
        status: 200,
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
