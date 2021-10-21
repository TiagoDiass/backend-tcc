import GetMedicineById from './GetMedicineById';
import {
  mockGetMedicineByIdDTO,
  mockMedicine,
  mockMedicineRepository,
} from '@testUtils/medicinesMocks';
import IMedicineRepository from 'domain/ports/MedicineRepository';

describe('Service: GetMedicineById', () => {
  it('should return correctly if medicine has been found', async () => {
    const getMedicineByIdDTO = mockGetMedicineByIdDTO();
    const medicineToBeReturned = mockMedicine();

    const medicineRepositoryMock: IMedicineRepository = {
      ...mockMedicineRepository(),
      findById: jest.fn().mockResolvedValue({ data: medicineToBeReturned }),
    };

    const getMedicineById = new GetMedicineById(medicineRepositoryMock);
    const response = await getMedicineById.execute(getMedicineByIdDTO);

    expect(medicineRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(medicineRepositoryMock.findById).toHaveBeenCalledWith(getMedicineByIdDTO.id);
    expect(response).toEqual({
      status: 200,
      result: medicineToBeReturned,
    });
  });

  it('should return correctly if medicine has not been found', async () => {
    const getMedicineByIdDTO = mockGetMedicineByIdDTO();

    const medicineRepositoryMock: IMedicineRepository = {
      ...mockMedicineRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const getMedicineById = new GetMedicineById(medicineRepositoryMock);
    const response = await getMedicineById.execute(getMedicineByIdDTO);

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

    const getMedicineById = new GetMedicineById(medicineRepositoryMock);
    const response = await getMedicineById.execute(mockGetMedicineByIdDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
