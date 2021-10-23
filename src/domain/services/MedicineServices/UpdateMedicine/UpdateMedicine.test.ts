import UpdateMedicine from './UpdateMedicine';
import Medicine from 'domain/entities/Medicine/Medicine';
import IMedicineRepository from 'domain/ports/MedicineRepository';
import {
  mockMedicine,
  mockMedicineRepository,
  mockUpdateMedicineDTO,
} from '@testUtils/medicinesMocks';
import { IRequestUpdateMedicineDTO } from 'domain/services/dto';

describe('Service: UpdateMedicine', () => {
  it('should return correctly if medicine was found and successfully updated', async () => {
    const updateMedicineDTO = mockUpdateMedicineDTO();
    const notUpdatedMedicine = new Medicine({
      ...mockMedicine(),
      id: updateMedicineDTO.id,
    });
    const updatedMedicine = new Medicine(updateMedicineDTO);

    const medicineRepositoryMock: IMedicineRepository = {
      ...mockMedicineRepository(),
      findById: jest.fn().mockResolvedValue({ data: notUpdatedMedicine }),
      update: jest.fn().mockResolvedValue({ data: updateMedicineDTO }),
    };

    const updateMedicine = new UpdateMedicine(medicineRepositoryMock);

    const response = await updateMedicine.execute(updateMedicineDTO);

    expect(medicineRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(medicineRepositoryMock.findById).toHaveBeenCalledWith(updateMedicineDTO.id);
    expect(medicineRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(medicineRepositoryMock.update).toHaveBeenCalledWith(updatedMedicine);

    expect(response).toEqual({
      status: 200,
      result: updatedMedicine,
    });
  });

  it('should return correctly if medicine was not found', async () => {
    const updateMedicineDTO = mockUpdateMedicineDTO();

    const medicineRepositoryMock: IMedicineRepository = {
      ...mockMedicineRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const updateMedicine = new UpdateMedicine(medicineRepositoryMock);

    const response = await updateMedicine.execute(updateMedicineDTO);

    expect(medicineRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(medicineRepositoryMock.findById).toHaveBeenCalledWith(updateMedicineDTO.id);
    expect(medicineRepositoryMock.update).not.toHaveBeenCalled();

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum medicamento cadastrado com o ID informado',
      },
    });
  });

  it('should return correctly if Medicine entity throws an exception', async () => {
    const updateMedicineDTO: IRequestUpdateMedicineDTO = {
      ...mockUpdateMedicineDTO(),
      expirationDate: 'invalid-date', // invalid expirationDate
    };

    const medicineRepositoryMock: IMedicineRepository = {
      ...mockMedicineRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockMedicine() }),
    };

    const updateMedicine = new UpdateMedicine(medicineRepositoryMock);

    const response = await updateMedicine.execute(updateMedicineDTO);

    expect(medicineRepositoryMock.update).not.toHaveBeenCalled();
    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Medicamento inválido',
        errorsList: ['data de validade do medicamento deve estar no formato yyyy-mm-dd'],
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

    const updateMedicine = new UpdateMedicine(medicineRepositoryMock);

    const response = await updateMedicine.execute(mockUpdateMedicineDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
