import ListMedicines from './ListMedicines';
import { mockMedicine, mockMedicineRepository } from '@testUtils/medicinesMocks';
import IMedicineRepository from 'domain/ports/MedicineRepository';

describe('Service: ListMedicines', () => {
  it('should call medicineRepository.list() and return correctly', async () => {
    const medicinesToBeReturned = [mockMedicine(), mockMedicine()];

    const medicineRepositoryMock: IMedicineRepository = {
      ...mockMedicineRepository(),

      list: jest.fn().mockResolvedValue({
        data: medicinesToBeReturned,
      }),
    };

    const listMedicines = new ListMedicines(medicineRepositoryMock);

    const response = await listMedicines.execute();

    expect(medicineRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 200,
      result: medicinesToBeReturned,
    });
  });

  it('should return correctly if MedicineRepository throws an exception', async () => {
    const medicineRepositoryMock: IMedicineRepository = {
      ...mockMedicineRepository(),

      list: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const listMedicines = new ListMedicines(medicineRepositoryMock);

    const response = await listMedicines.execute();

    expect(medicineRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 500,
      error: { message: 'Erro mockado' },
    });
  });
});
