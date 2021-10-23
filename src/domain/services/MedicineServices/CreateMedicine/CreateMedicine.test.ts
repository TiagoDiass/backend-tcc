import CreateMedicine from './CreateMedicine';
import { IRequestCreateMedicineDTO } from 'domain/services/dto';
import IMedicineRepository from 'domain/ports/MedicineRepository';
import { mockCreateMedicineDTO, mockMedicineRepository } from '@testUtils/medicinesMocks';

const UUID_MOCK = '1e16f407-1cef-427c-af39-e9c3efcbd18e';

jest.mock('uuid', () => ({
  v4: jest.fn().mockImplementation(() => UUID_MOCK),
}));

describe('Service: CreateMedicine', () => {
  it('should call medicineRepository.save() and return correctly', async () => {
    const medicineRepositoryMock: IMedicineRepository = {
      ...mockMedicineRepository(),

      save: jest.fn().mockImplementationOnce(medicine => ({
        data: medicine,
      })),
    };

    const createMedicine = new CreateMedicine(medicineRepositoryMock);

    const createMedicineDTO: IRequestCreateMedicineDTO = {
      name: 'Nome do medicamento',
      description: 'descrição do medicamento',
      expirationDate: '2023-10-13',
      amount: {
        unit: 'mgs',
        value: 2,
      },
    };

    const response = await createMedicine.execute(createMedicineDTO);

    expect(medicineRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(medicineRepositoryMock.save).toHaveBeenCalledWith({
      id: UUID_MOCK,
      ...createMedicineDTO,
    });

    expect(response).toEqual({
      status: 201,
      result: {
        id: UUID_MOCK,
        ...createMedicineDTO,
      },
    });
  });

  it('should return correctly if Medicine entity throws an exception', async () => {
    const medicineRepositoryMock = mockMedicineRepository();

    const createMedicine = new CreateMedicine(medicineRepositoryMock);

    const createMedicineDTO: IRequestCreateMedicineDTO = {
      ...mockCreateMedicineDTO(),
      name: '123', // less than 4 characters, Medicine entity will throw an exception
    };

    const response = await createMedicine.execute(createMedicineDTO);

    expect(medicineRepositoryMock.save).not.toHaveBeenCalled();

    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Medicamento inválido',
        errorsList: ['nome do medicamento deve conter pelo menos 4 caracteres'],
      },
    });
  });

  it('should return correctly if MedicineRepository throws an exception', async () => {
    const medicineRepositoryMock = {
      ...mockMedicineRepository(),

      save: jest.fn().mockImplementationOnce(() => {
        throw new Error('Erro mockado');
      }),
    };

    const createMedicine = new CreateMedicine(medicineRepositoryMock);

    const response = await createMedicine.execute(mockCreateMedicineDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
