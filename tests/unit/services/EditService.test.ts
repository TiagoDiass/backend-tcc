import Service from 'domain/entities/Service';
import { EditService } from 'domain/services/ServiceServices';
import { mockEditServiceDTO, mockService, mockServiceRepository } from '../../utils/servicesMocks';

describe('EditService service', () => {
  it('should return correctly if service was found and successfully updated', async () => {
    const editServiceDTO = mockEditServiceDTO();
    const notEditedService = new Service({ ...mockService(), id: editServiceDTO.id });
    const updatedService = new Service(editServiceDTO);

    const serviceRepositoryMock = {
      ...mockServiceRepository(),
      findById: jest.fn().mockResolvedValue({ data: notEditedService }),
      update: jest.fn().mockResolvedValue({ data: updatedService }),
    };

    const editService = new EditService(serviceRepositoryMock);

    const response = await editService.execute(editServiceDTO);

    expect(serviceRepositoryMock.findById).toHaveBeenCalledWith(editServiceDTO.id);
    expect(serviceRepositoryMock.update).toHaveBeenCalledWith(updatedService);

    expect(response).toEqual({
      status: 200,
      result: updatedService,
    });
  });

  xit('should return correctly if Service entity throws an exception', async () => {});

  it('should return correctly if service has not been found', async () => {
    const editServiceDTO = mockEditServiceDTO();

    const serviceRepositoryMock = {
      ...mockServiceRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const editService = new EditService(serviceRepositoryMock);

    const response = await editService.execute(editServiceDTO);

    expect(serviceRepositoryMock.findById).toHaveBeenCalledWith(editServiceDTO.id);

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum serviço cadastrado com o ID informado',
      },
    });
  });
});
