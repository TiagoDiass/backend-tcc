import {
  mockCreatePartnerClinicDTO,
  mockDeletePartnerClinicDTO,
  mockUpdatePartnerClinicDTO,
  mockPartnerClinic,
  mockPartnerClinicRepository,
  mockGetPartnerClinicByIdDTO,
} from '@testUtils/partnerClinicsMocks';
import PartnerClinicController from './PartnerClinicController';

/**
 * @factory returns the S.U.T (system under test), which is the PartnerClinicController in this case
 */
const makeSut = () => {
  const partnerClinicRepositoryMock = mockPartnerClinicRepository();
  const partnerClinicController = new PartnerClinicController(partnerClinicRepositoryMock);

  return { partnerClinicController };
};

// MOCKS before tests run

// ListPartnerClinics mock
const partnerClinicsToBeReturned = [mockPartnerClinic(), mockPartnerClinic()];

const mockListPartnerClinicsExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: partnerClinicsToBeReturned })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/PartnerClinicServices/ListPartnerClinics/ListPartnerClinics', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockListPartnerClinicsExecute,
  }));
});

// CreatePartnerClinic mock
const createdPartnerClinicMock = mockPartnerClinic();
const errorCreatePartnerClinicMock = {
  message: 'Erro ao criar clínica',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
} as const;
const mockCreatePartnerClinicExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 201, result: createdPartnerClinicMock })
  .mockResolvedValueOnce({ status: 400, error: errorCreatePartnerClinicMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/PartnerClinicServices/CreatePartnerClinic/CreatePartnerClinic', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockCreatePartnerClinicExecute,
  }));
});

// DeletePartnerClinic mock
const deletedPartnerClinicMock = mockPartnerClinic();
const errorDeletePartnerClinicMock = {
  message: 'Clínica parceira não encontrada',
} as const;
const mockDeletePartnerClinicExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: deletedPartnerClinicMock.id })
  .mockResolvedValueOnce({ status: 404, error: errorDeletePartnerClinicMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/PartnerClinicServices/DeletePartnerClinic/DeletePartnerClinic', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockDeletePartnerClinicExecute,
  }));
});

// GetPartnerClinicById mock
const foundPartnerClinicMock = mockPartnerClinic();
const errorGetPartnerClinicByIdMock = {
  message: 'Clínica parceira não encontrada',
} as const;
const mockGetPartnerClinicByIdExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: foundPartnerClinicMock })
  .mockResolvedValueOnce({ status: 404, error: errorGetPartnerClinicByIdMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/PartnerClinicServices/GetPartnerClinicById/GetPartnerClinicById', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockGetPartnerClinicByIdExecute,
  }));
});

// UpdatePartnerClinic mock
const updatedPartnerClinicMock = mockPartnerClinic();
const errorUpdatePartnerClinicMock = {
  message: 'Erro ao atualizar clínica',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
} as const;
const mockUpdatePartnerClinicExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: updatedPartnerClinicMock })
  .mockResolvedValueOnce({ status: 400, error: errorUpdatePartnerClinicMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/PartnerClinicServices/UpdatePartnerClinic/UpdatePartnerClinic', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockUpdatePartnerClinicExecute,
  }));
});

describe('Controller: PartnerClinicController', () => {
  describe('listPartnerClinics method', () => {
    it('should return correctly (list successfully)', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.listPartnerClinics();

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Lista de clínicas parceiras obtida com sucesso',
          data: partnerClinicsToBeReturned,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.listPartnerClinics();

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao listar clínicas parceiras: Erro mockado',
        },
      });
    });
  });

  describe('createPartnerClinic method', () => {
    it('should return correctly (created successfully)', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.createPartnerClinic(
        mockCreatePartnerClinicDTO()
      );

      expect(response).toEqual({
        status: 201,
        result: {
          message: 'Clínica parceira cadastrada com sucesso',
          data: createdPartnerClinicMock,
        },
      });
    });

    it('should return correctly (not created, invalid fields)', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.createPartnerClinic(
        mockCreatePartnerClinicDTO()
      );

      expect(response).toEqual({
        status: 400,
        result: {
          message: errorCreatePartnerClinicMock.message,
          errors: errorCreatePartnerClinicMock.errorsList,
          data: null,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.createPartnerClinic(
        mockCreatePartnerClinicDTO()
      );

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao executar o cadastro de uma clínica parceira: Erro mockado',
        },
      });
    });
  });

  describe('deletePartnerClinic method', () => {
    it('should return correctly (successfully deleted)', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.deletePartnerClinic({
        id: deletedPartnerClinicMock.id,
      });

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Clínica parceira excluída com sucesso',
          data: deletedPartnerClinicMock.id,
        },
      });
    });

    it('should return correctly (clinic not found)', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.deletePartnerClinic(
        mockDeletePartnerClinicDTO()
      );

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorDeletePartnerClinicMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exceptions occurs', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.deletePartnerClinic(
        mockDeletePartnerClinicDTO()
      );

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao excluir clínica parceira: Erro mockado',
        },
      });
    });
  });

  describe('getPartnerClinicById method', () => {
    it('should return correctly (clinic successfully found)', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.getPartnerClinicById(
        mockGetPartnerClinicByIdDTO()
      );

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Clínica parceira obtida com sucesso',
          data: foundPartnerClinicMock,
        },
      });
    });

    it('should return correctly (clinic not found)', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.getPartnerClinicById(
        mockGetPartnerClinicByIdDTO()
      );

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorGetPartnerClinicByIdMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.getPartnerClinicById(
        mockGetPartnerClinicByIdDTO()
      );

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao obter clínica parceira: Erro mockado',
        },
      });
    });
  });

  describe('updatePartnerClinic method', () => {
    it('should return correctly (updated succesfully)', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.updatePartnerClinic(
        mockUpdatePartnerClinicDTO()
      );

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Clínica parceira atualizada com sucesso',
          data: updatedPartnerClinicMock,
        },
      });
    });

    it('should return correctly (not updated, invalid fields)', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.updatePartnerClinic(
        mockUpdatePartnerClinicDTO()
      );

      expect(response).toEqual({
        status: 400,
        result: {
          message: errorUpdatePartnerClinicMock.message,
          data: null,
          errors: errorUpdatePartnerClinicMock.errorsList,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { partnerClinicController } = makeSut();

      const response = await partnerClinicController.updatePartnerClinic(
        mockUpdatePartnerClinicDTO()
      );

      expect(response).toEqual({
        status: 500,
        result: {
          message:
            'Erro inesperado ao executar a atualização de uma clínica parceira: Erro mockado',
        },
      });
    });
  });
});
