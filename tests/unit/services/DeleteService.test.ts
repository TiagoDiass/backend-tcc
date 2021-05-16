import { IRequestDeleteServiceDTO } from 'domain/services/dto';
import { DeleteService } from 'domain/services/ServiceServices';
import { mockService, mockServiceRepository } from '../../utils/servicesMocks';
import faker from 'faker';

describe('DeleteService service', () => {
  it('should return correctly if deleted Service successfully', async () => {
    const deleteServiceDTO: IRequestDeleteServiceDTO = {
      id: faker.datatype.uuid(),
    };

    const serviceRepositoryMock = {
      ...mockServiceRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockService() }),
      delete: jest.fn().mockResolvedValue({ data: deleteServiceDTO.id }),
    };

    const deleteService = new DeleteService(serviceRepositoryMock);

    const response = await deleteService.execute(deleteServiceDTO);

    expect(serviceRepositoryMock.delete).toHaveBeenCalledWith(
      deleteServiceDTO.id
    );

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

    const deleteServiceDTO: IRequestDeleteServiceDTO = {
      id: faker.datatype.uuid(),
    };

    const response = await deleteService.execute(deleteServiceDTO);

    expect(serviceRepositoryMock.findById).toHaveBeenCalledWith(
      deleteServiceDTO.id
    );

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum serviço cadastrado com o ID informado',
      },
    });
  });
});
