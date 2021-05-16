import { IRequestDeleteServiceDTO } from 'domain/services/dto';
import { DeleteService } from 'domain/services/ServiceServices';
import faker from 'faker';
import { mockServiceRepository } from '../../utils/servicesMocks';

describe('DeleteService service', () => {
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
