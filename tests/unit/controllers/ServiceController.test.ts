import ServiceController from 'adapters/controllers/ServiceController';
import {
  mockCreateServiceDTO,
  mockDeleteServiceDTO,
  mockGetServiceByIdDTO,
  mockService,
  mockServiceRepository,
  mockUpdateServiceDTO,
} from '../../utils/servicesMocks';

const makeSut = () => {
  const serviceRepositoryMock = mockServiceRepository();
  const serviceController = new ServiceController(serviceRepositoryMock);

  return { serviceController };
};

// MOCKS before tests run

// ListServices mock
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

// CreateService mock
const createdServiceMock = mockService();
const errorCreateServiceMock = {
  message: 'Erro ao criar serviço',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
};
const mockCreateServiceExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 201, result: createdServiceMock })
  .mockResolvedValueOnce({ status: 400, error: errorCreateServiceMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/ServiceServices/CreateService', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockCreateServiceExecute,
  }));
});

// DeleteService mock
const deletedServiceMock = mockService();
const errorDeleteServiceMock = {
  message: 'Serviço não encontrado',
};
const mockDeleteServiceExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: deletedServiceMock.id })
  .mockResolvedValueOnce({ status: 404, error: errorDeleteServiceMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/ServiceServices/DeleteService', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockDeleteServiceExecute,
  }));
});

// GetServiceById mock
const foundServiceMock = mockService();
const errorGetServiceByIdMock = {
  message: 'Serviço não encontrado',
};
const mockGetServiceByIdExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: foundServiceMock })
  .mockResolvedValueOnce({ status: 404, error: errorGetServiceByIdMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/ServiceServices/GetServiceById', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockGetServiceByIdExecute,
  }));
});

// UpdateService mock
const updatedServiceMock = mockService();
const errorUpdateServiceMock = {
  message: 'Erro ao atualizar serviço',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
};
const mockUpdateServiceExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: updatedServiceMock })
  .mockResolvedValueOnce({ status: 400, error: errorUpdateServiceMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/ServiceServices/UpdateService', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockUpdateServiceExecute,
  }));
});

describe('ServiceController tests', () => {
  describe('listServices method', () => {
    it('should return correctly (list successfully)', async () => {
      const { serviceController } = makeSut();

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
      const { serviceController } = makeSut();

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
      const { serviceController } = makeSut();

      const response = await serviceController.createService(mockCreateServiceDTO());

      expect(response).toEqual({
        status: 201,
        result: {
          message: 'Serviço criado com sucesso',
          data: createdServiceMock,
        },
      });
    });

    it('should return correctly (not created, invalid fields)', async () => {
      const { serviceController } = makeSut();

      const response = await serviceController.createService(mockCreateServiceDTO());

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
      const { serviceController } = makeSut();

      const response = await serviceController.createService(mockCreateServiceDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao executar a criação de um serviço: Erro mockado',
        },
      });
    });
  });

  describe('deleteService method', () => {
    it('should return correctly (successfully deleted)', async () => {
      const { serviceController } = makeSut();

      const response = await serviceController.deleteService({
        id: deletedServiceMock.id,
      });

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Serviço excluído com sucesso',
          data: deletedServiceMock.id,
        },
      });
    });

    it('should return correctly (service not found)', async () => {
      const { serviceController } = makeSut();

      const response = await serviceController.deleteService(mockDeleteServiceDTO());

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorDeleteServiceMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exceptions occurs', async () => {
      const { serviceController } = makeSut();

      const response = await serviceController.deleteService(mockDeleteServiceDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao excluir serviço: Erro mockado',
        },
      });
    });
  });

  describe('getServiceById method', () => {
    it('should return correctly (service successfully found)', async () => {
      const { serviceController } = makeSut();

      const response = await serviceController.getServiceById(mockGetServiceByIdDTO());

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Serviço obtido com sucesso',
          data: foundServiceMock,
        },
      });
    });

    it('should return correctly (service not found)', async () => {
      const { serviceController } = makeSut();

      const response = await serviceController.getServiceById(mockGetServiceByIdDTO());

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorGetServiceByIdMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { serviceController } = makeSut();

      const response = await serviceController.getServiceById(mockGetServiceByIdDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao obter serviço: Erro mockado',
        },
      });
    });
  });

  describe('updateService method', () => {
    it('should return correctly (updated succesfully)', async () => {
      const { serviceController } = makeSut();

      const response = await serviceController.updateService(mockUpdateServiceDTO());

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Serviço atualizado com sucesso',
          data: updatedServiceMock,
        },
      });
    });

    it('should return correctly (not updated, invalid fields)', async () => {
      const { serviceController } = makeSut();

      const response = await serviceController.updateService(mockUpdateServiceDTO());

      expect(response).toEqual({
        status: 400,
        result: {
          message: errorUpdateServiceMock.message,
          data: null,
          errors: errorUpdateServiceMock.errorsList,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { serviceController } = makeSut();

      const response = await serviceController.updateService(mockUpdateServiceDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao executar a atualização de um serviço: Erro mockado',
        },
      });
    });
  });
});
