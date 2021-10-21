import Medicine from 'domain/entities/Medicine/Medicine';
import IMedicineRepository from 'domain/ports/MedicineRepository';
import { IRequestDeleteMedicineDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class DeleteMedicine {
  constructor(private readonly medicineRepository: IMedicineRepository) {}

  async execute(
    deleteMedicineDTO: IRequestDeleteMedicineDTO
  ): Promise<DomainServiceResult<Medicine['id']>> {
    try {
      const { data: medicineExists } = await this.medicineRepository.findById(deleteMedicineDTO.id);

      if (!medicineExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum medicamento cadastrado com o ID informado',
          },
        };
      }

      const repoResult = await this.medicineRepository.delete(deleteMedicineDTO.id);

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
