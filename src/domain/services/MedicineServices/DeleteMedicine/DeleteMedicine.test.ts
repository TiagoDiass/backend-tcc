import DeleteMedicine from './DeleteMedicine';
import {
  mockDeleteMedicineDTO,
  mockMedicine,
  mockMedicineRepository,
} from '@testUtils/medicinesMocks';
import IMedicineRepository from 'domain/ports/MedicineRepository';

describe('Service: DeleteMedicine', () => {
  it('should return correctly if medicine has been deleted successfully', async () => {
    const deleteMedicineDTO = mockDeleteMedicineDTO();

    const medicineRepositoryMock: IMedicineRepository = {
      ...mockMedicineRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockMedicine() }),
      delete: jest.fn().mockResolvedValue({ data: deleteMedicineDTO.id }),
    };

    const deleteMedicine = new DeleteMedicine(medicineRepositoryMock);

    const response = await deleteMedicine.execute(deleteMedicineDTO);

    expect(medicineRepositoryMock.delete).toHaveBeenCalledWith(deleteMedicineDTO.id);

    expect(response).toEqual({
      status: 200,
      result: deleteMedicineDTO.id,
    });
  });

  it('should return correctly if there is no medicine with the received id', async () => {
    const medicineRepositoryMock: IMedicineRepository = {
      ...mockMedicineRepository(),
      findById: jest.fn().mockResolvedValue({ status: 404, data: null }),
    };

    const deleteMedicine = new DeleteMedicine(medicineRepositoryMock);

    const deleteMedicineDTO = mockDeleteMedicineDTO();

    const response = await deleteMedicine.execute(deleteMedicineDTO);

    expect(medicineRepositoryMock.findById).toHaveBeenCalledWith(deleteMedicineDTO.id);

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum medicamento cadastrado com o ID informado',
      },
    });
  });

  it('should return correctly if MedicineRepository throws an exception', async () => {
    const medicineRepositoryMock: IMedicineRepository = {
      ...mockMedicineRepository(),
      findById: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const deleteMedicine = new DeleteMedicine(medicineRepositoryMock);

    const response = await deleteMedicine.execute(mockDeleteMedicineDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
