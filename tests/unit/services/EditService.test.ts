import { EditService } from 'domain/services/ServiceServices';
import {
  mockEditServiceDTO,
  mockService,
  mockServiceRepository,
} from '../../utils/servicesMocks';

describe('EditService service', () => {
  it('should return correctly if service was found and successfully edited', async () => {
    const editServiceDTO = mockEditServiceDTO();

    const serviceRepositoryMock = {
      ...mockServiceRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockService() }),
    };
  });

  it('should return correctly if service has not been found', async () => {
    const editServiceDTO = mockEditServiceDTO();

    const serviceRepositoryMock = {
      ...mockServiceRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const editService = new EditService(serviceRepositoryMock);

    const response = await editService.execute(editServiceDTO);

    expect(serviceRepositoryMock.findById).toHaveBeenCalledWith(
      editServiceDTO.id
    );

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum serviço cadastrado com o ID informado',
      },
    });
  });
});
