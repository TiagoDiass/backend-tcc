import ServiceController from 'adapters/controllers/ServiceController';
import {
  mockCreateServiceDTO,
  mockDeleteServiceDTO,
  mockService,
  mockServiceRepository,
} from '../../utils/servicesMocks';

// mocking this before test run
const servicesToBeReturned = [mockService(), mockService()];

const mockListServicesExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: servicesToBeReturned })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/ServiceServices/ListServices', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockListServicesExecute,
  }));
});

const serviceCreatedMock = mockService();
const errorCreateServiceMock = {
  message: 'Erro ao criar serviço',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
};
const mockCreateServiceExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 201, result: serviceCreatedMock })
  .mockResolvedValueOnce({ status: 400, error: errorCreateServiceMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/ServiceServices/CreateService', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockCreateServiceExecute,
  }));
});

const serviceDeletedMock = mockService();
const errorDeleteServiceMock = {
  message: 'Serviço não encontrado',
};
const mockDeleteServiceExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: serviceDeletedMock.id })
  .mockResolvedValueOnce({ status: 404, error: errorDeleteServiceMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/ServiceServices/DeleteService', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockDeleteServiceExecute,
  }));
});

describe('ServiceController tests', () => {
  describe('listServices method', () => {
    it('should return correctly (list successfully)', async () => {
      const serviceRepositoryMock = mockServiceRepository();

      const serviceController = new ServiceController(serviceRepositoryMock);

      const response = await serviceController.listServices();

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Lista de serviços obtida com sucesso',
          data: servicesToBeReturned,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const serviceRepositoryMock = mockServiceRepository();

      const serviceController = new ServiceController(serviceRepositoryMock);

      const response = await serviceController.listServices();

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao listar serviços: Erro mockado',
        },
      });
    });
  });

  describe('createService method', () => {
    it('should return correctly (created successfully)', async () => {
      const serviceRepositoryMock = mockServiceRepository();

      const serviceController = new ServiceController(serviceRepositoryMock);

      const response = await serviceController.createService(
        mockCreateServiceDTO()
      );

      expect(response).toEqual({
        status: 201,
        result: {
          message: 'Serviço criado com sucesso',
          data: serviceCreatedMock,
        },
      });
    });

    it('should return correctly (not created, invalid fields)', async () => {
      const serviceRepositoryMock = mockServiceRepository();

      const serviceController = new ServiceController(serviceRepositoryMock);

      const response = await serviceController.createService(
        mockCreateServiceDTO()
      );

      expect(response).toEqual({
        status: 400,
        result: {
          message: errorCreateServiceMock.message,
          errors: errorCreateServiceMock.errorsList,
          data: null,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const serviceRepositoryMock = mockServiceRepository();

      const serviceController = new ServiceController(serviceRepositoryMock);

      const response = await serviceController.createService(
        mockCreateServiceDTO()
      );

      expect(response).toEqual({
        status: 500,
        result: {
          message:
            'Erro inesperado ao executar a criação de um serviço: Erro mockado',
        },
      });
    });
  });

  describe('deleteService method', () => {
    it('should return correctly (successfully deleted)', async () => {
      const serviceRepositoryMock = mockServiceRepository();
      const serviceController = new ServiceController(serviceRepositoryMock);

      const response = await serviceController.deleteService({
        id: serviceDeletedMock.id,
      });

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Serviço excluído com sucesso',
          data: serviceDeletedMock.id,
        },
      });
    });

    it('should return correctly (service not found)', async () => {
      const serviceRepositoryMock = mockServiceRepository();
      const serviceController = new ServiceController(serviceRepositoryMock);

      const response = await serviceController.deleteService(
        mockDeleteServiceDTO()
      );

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorDeleteServiceMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exceptions occurs', async () => {
      const serviceRepositoryMock = mockServiceRepository();
      const serviceController = new ServiceController(serviceRepositoryMock);

      const response = await serviceController.deleteService(
        mockDeleteServiceDTO()
      );

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao excluir serviço: Erro mockado',
        },
      });
    });
  });
});
