import { DeleteService } from 'domain/services/ServiceServices';
import {
  mockDeleteServiceDTO,
  mockService,
  mockServiceRepository,
} from '../../../utils/servicesMocks';

describe('DeleteService service', () => {
  it('should return correctly if deleted Service successfully', async () => {
    const deleteServiceDTO = mockDeleteServiceDTO();

    const serviceRepositoryMock = {
      ...mockServiceRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockService() }),
      delete: jest.fn().mockResolvedValue({ data: deleteServiceDTO.id }),
    };

    const deleteService = new DeleteService(serviceRepositoryMock);

    const response = await deleteService.execute(deleteServiceDTO);

    expect(serviceRepositoryMock.delete).toHaveBeenCalledWith(deleteServiceDTO.id);

    expect(response).toEqual({
      status: 200,
      result: deleteServiceDTO.id,
    });
  });

  it('should return correctly if there is no title with the received id', async () => {
    const serviceRepositoryMock = {
      ...mockServiceRepository(),
      findById: jest.fn().mockResolvedValue({ status: 404, data: null }),
    };

    const deleteService = new DeleteService(serviceRepositoryMock);

    const deleteServiceDTO = mockDeleteServiceDTO();

    const response = await deleteService.execute(deleteServiceDTO);

    expect(serviceRepositoryMock.findById).toHaveBeenCalledWith(deleteServiceDTO.id);

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum serviço cadastrado com o ID informado',
      },
    });
  });

  it('should return correctly if ServiceRepository throws an exception', async () => {
    const serviceRepositoryMock = {
      ...mockServiceRepository(),
      findById: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const deleteService = new DeleteService(serviceRepositoryMock);

    const response = await deleteService.execute(mockDeleteServiceDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
