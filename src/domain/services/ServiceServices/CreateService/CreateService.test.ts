import { CreateService } from 'domain/services/ServiceServices';
import { IRequestCreateServiceDTO } from 'domain/services/dto';
import { mockServiceRepository } from '@testUtils/servicesMocks';

const UUID_MOCK = '1e16f407-1cef-427c-af39-e9c3efcbd18e';

jest.mock('uuid', () => ({
  v4: jest.fn().mockImplementation(() => UUID_MOCK),
}));

describe('Service: CreateService', () => {
  it('should call serviceRepository.save() and return correctly', async () => {
    const serviceRepositoryMock = {
      ...mockServiceRepository(),

      save: jest.fn().mockImplementationOnce(service => ({
        data: service,
      })), // mocking repository.save(), it will keep returning the created service
    };

    const createService = new CreateService(serviceRepositoryMock);

    const createServiceDTO: IRequestCreateServiceDTO = {
      title: 'titulo do serviço',
      description: 'descrição do serviço',
    };

    const response = await createService.execute(createServiceDTO);

    expect(serviceRepositoryMock.save).toHaveBeenCalledWith({
      id: UUID_MOCK,
      title: createServiceDTO.title,
      description: createServiceDTO.description,
    });

    expect(response).toEqual({
      status: 201,
      result: {
        id: UUID_MOCK,
        title: createServiceDTO.title,
        description: createServiceDTO.description,
      },
    });
  });

  it('should return correctly if Service entity throws an exception', async () => {
    const serviceRepositoryMock = mockServiceRepository();

    const createService = new CreateService(serviceRepositoryMock);

    const createServiceDTO: IRequestCreateServiceDTO = {
      title: '', // title will be empty so Service entity will throw an exception
    };

    const response = await createService.execute(createServiceDTO);

    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Serviço inválido',
        errorsList: ['título do serviço deve conter pelo menos 5 caracteres'],
      },
    });
  });

  it('should return correctly if ServiceRepository throws an exception', async () => {
    const serviceRepositoryMock = {
      ...mockServiceRepository(),

      save: jest.fn().mockImplementationOnce(() => {
        throw new Error('Erro mockado');
      }),
    };

    const createService = new CreateService(serviceRepositoryMock);

    const createServiceDTO: IRequestCreateServiceDTO = {
      title: 'titulo do serviço',
      description: 'descrição do serviço',
    };

    const response = await createService.execute(createServiceDTO);

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
