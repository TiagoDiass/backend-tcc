import Service from 'domain/entities/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';
import { IRequestUpdateServiceDTO } from 'domain/services/dto';
import { UpdateService } from 'domain/services/ServiceServices';
import {
  mockUpdateServiceDTO,
  mockService,
  mockServiceRepository,
} from '../../utils/servicesMocks';

describe('UpdateService service', () => {
  it('should return correctly if service was found and successfully updated', async () => {
    const updateServiceDTO = mockUpdateServiceDTO();
    const notUpdatedService = new Service({ ...mockService(), id: updateServiceDTO.id });
    const updatedService = new Service(updateServiceDTO);

    const serviceRepositoryMock: IServiceRepository = {
      ...mockServiceRepository(),
      findById: jest.fn().mockResolvedValue({ data: notUpdatedService }),
      update: jest.fn().mockResolvedValue({ data: updatedService }),
    };

    const updateService = new UpdateService(serviceRepositoryMock);

    const response = await updateService.execute(updateServiceDTO);

    expect(serviceRepositoryMock.findById).toHaveBeenCalledWith(updateServiceDTO.id);
    expect(serviceRepositoryMock.update).toHaveBeenCalledWith(updatedService);

    expect(response).toEqual({
      status: 200,
      result: updatedService,
    });
  });

  it('should return correctly if service has not been found', async () => {
    const updateServiceDTO = mockUpdateServiceDTO();

    const serviceRepositoryMock = {
      ...mockServiceRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const updateService = new UpdateService(serviceRepositoryMock);

    const response = await updateService.execute(updateServiceDTO);

    expect(serviceRepositoryMock.findById).toHaveBeenCalledWith(updateServiceDTO.id);

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum serviço cadastrado com o ID informado',
      },
    });
  });

  it('should return correctly if Service entity throws an exception', async () => {
    const updateServiceDTO: IRequestUpdateServiceDTO = {
      ...mockUpdateServiceDTO(),
      title: '1234', // invalid title
    };

    const serviceRepositoryMock: IServiceRepository = {
      ...mockServiceRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockService() }),
    };

    const updateService = new UpdateService(serviceRepositoryMock);

    const response = await updateService.execute(updateServiceDTO);

    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Serviço inválido',
        errorsList: ['título do serviço deve conter pelo menos 5 caracteres'],
      },
    });
  });

  it('should return correctly if ServiceRepository throws an exception', async () => {
    const serviceRepositoryMock: IServiceRepository = {
      ...mockServiceRepository(),
      findById: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const updateService = new UpdateService(serviceRepositoryMock);

    const response = await updateService.execute(mockUpdateServiceDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
