import {
  mockMedicine,
  mockCreateMedicineDTO,
  mockDeleteMedicineDTO,
  mockGetMedicineByIdDTO,
  mockMedicineRepository,
  mockUpdateMedicineDTO,
} from '@testUtils/medicinesMocks';
import MedicineController from './MedicineController';

/**
 * @factory returns the S.U.T (system under test), which is the MedicineController in this case
 */
const makeSut = () => {
  const medicineRepositoryMock = mockMedicineRepository();
  const medicineController = new MedicineController(medicineRepositoryMock);

  return { medicineController };
};

// MOCKS before tests run

// ListMedicines mock
const medicinesToBeReturned = [mockMedicine(), mockMedicine()];

const mockListMedicinesExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: medicinesToBeReturned })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/MedicineServices/ListMedicines/ListMedicines', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockListMedicinesExecute,
  }));
});

// CreateMedicine mock
const createdMedicineMock = mockMedicine();
const errorCreateMedicineMock = {
  message: 'Erro ao cadastrar medicamento',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
} as const;
const mockCreateMedicineExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 201, result: createdMedicineMock })
  .mockResolvedValueOnce({ status: 400, error: errorCreateMedicineMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/MedicineServices/CreateMedicine/CreateMedicine', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockCreateMedicineExecute,
  }));
});

// DeleteMedicine mock
const deletedMedicineMock = mockMedicine();
const errorDeleteMedicineMock = {
  message: 'Medicamento não encontrado',
} as const;
const mockDeleteMedicineExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: deletedMedicineMock.id })
  .mockResolvedValueOnce({ status: 404, error: errorDeleteMedicineMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/MedicineServices/DeleteMedicine/DeleteMedicine', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockDeleteMedicineExecute,
  }));
});

// GetMedicineById mock
const foundMedicineMock = mockMedicine();
const errorGetMedicineByIdMock = {
  message: 'Medicamento não encontrado',
} as const;
const mockGetMedicineByIdExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: foundMedicineMock })
  .mockResolvedValueOnce({ status: 404, error: errorGetMedicineByIdMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/MedicineServices/GetMedicineById/GetMedicineById', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockGetMedicineByIdExecute,
  }));
});

// UpdateMedicine mock
const updatedMedicineMock = mockMedicine();
const errorUpdateMedicineMock = {
  message: 'Erro ao atualizar medicamento',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
} as const;
const mockUpdateMedicineExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: updatedMedicineMock })
  .mockResolvedValueOnce({ status: 400, error: errorUpdateMedicineMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/MedicineServices/UpdateMedicine/UpdateMedicine', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockUpdateMedicineExecute,
  }));
});

describe('Controller: AnimalController', () => {
  describe('listMedicines method', () => {
    it('should return correctly (list successfully)', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.listMedicines();

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Lista de medicamentos obtida com sucesso',
          data: medicinesToBeReturned,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.listMedicines();

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao listar medicamentos: Erro mockado',
        },
      });
    });
  });

  describe('createMedicine method', () => {
    it('should return correctly (created successfully)', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.createMedicine(mockCreateMedicineDTO());

      expect(response).toEqual({
        status: 201,
        result: {
          message: 'Medicamento cadastrado com sucesso',
          data: createdMedicineMock,
        },
      });
    });

    it('should return correctly (not created, invalid fields)', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.createMedicine(mockCreateMedicineDTO());

      expect(response).toEqual({
        status: 400,
        result: {
          message: errorCreateMedicineMock.message,
          errors: errorCreateMedicineMock.errorsList,
          data: null,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.createMedicine(mockCreateMedicineDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao executar o cadastro de um medicamento: Erro mockado',
        },
      });
    });
  });

  describe('deleteMedicine method', () => {
    it('should return correctly (successfully deleted)', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.deleteMedicine({
        id: deletedMedicineMock.id,
      });

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Medicamento excluído com sucesso',
          data: deletedMedicineMock.id,
        },
      });
    });

    it('should return correctly (medicine not found)', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.deleteMedicine(mockDeleteMedicineDTO());

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorDeleteMedicineMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exceptions occurs', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.deleteMedicine(mockDeleteMedicineDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao excluir medicamento: Erro mockado',
        },
      });
    });
  });

  describe('getMedicineById method', () => {
    it('should return correctly (medicine successfully found)', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.getMedicineById(mockDeleteMedicineDTO());

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Medicamento obtido com sucesso',
          data: foundMedicineMock,
        },
      });
    });

    it('should return correctly (medicine not found)', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.getMedicineById(mockDeleteMedicineDTO());

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorGetMedicineByIdMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.getMedicineById(mockGetMedicineByIdDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao obter medicamento: Erro mockado',
        },
      });
    });
  });

  describe('updateMedicine method', () => {
    it('should return correctly (updated succesfully)', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.updateMedicine(mockUpdateMedicineDTO());

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Medicamento atualizado com sucesso',
          data: updatedMedicineMock,
        },
      });
    });

    it('should return correctly (not updated, invalid fields)', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.updateMedicine(mockUpdateMedicineDTO());

      expect(response).toEqual({
        status: 400,
        result: {
          message: errorUpdateMedicineMock.message,
          data: null,
          errors: errorUpdateMedicineMock.errorsList,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { medicineController } = makeSut();

      const response = await medicineController.updateMedicine(mockUpdateMedicineDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao executar a atualização de um medicamento: Erro mockado',
        },
      });
    });
  });
});
