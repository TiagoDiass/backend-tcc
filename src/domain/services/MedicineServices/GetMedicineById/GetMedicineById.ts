import Medicine from 'domain/entities/Medicine/Medicine';
import IMedicineRepository from 'domain/ports/MedicineRepository';
import { IRequestGetMedicineByIdDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class GetMedicineById {
  constructor(private readonly medicineRepository: IMedicineRepository) {}

  public async execute(
    getMedicineByIdDTO: IRequestGetMedicineByIdDTO
  ): Promise<DomainServiceResult<Medicine>> {
    try {
      const { data: medicine } = await this.medicineRepository.findById(getMedicineByIdDTO.id);

      if (!medicine) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum medicamento cadastrado com o ID informado',
          },
        };
      }

      return {
        status: 200,
        result: medicine,
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
