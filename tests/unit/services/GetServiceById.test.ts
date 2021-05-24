import GetServiceById from 'domain/services/ServiceServices/GetServiceById';
import {
  mockGetServiceByIdDTO,
  mockService,
  mockServiceRepository,
} from '../../utils/servicesMocks';

describe('GetServiceById Service', () => {
  it('should return correctly if service has been found', async () => {
    const getServiceByIdDTO = mockGetServiceByIdDTO();
    const serviceToBeReturned = mockService();

    const serviceRepositoryMock = {
      ...mockServiceRepository(),
      findById: jest.fn().mockResolvedValue({ data: serviceToBeReturned }),
    };

    const getServiceById = new GetServiceById(serviceRepositoryMock);

    const response = await getServiceById.execute(getServiceByIdDTO);

    expect(serviceRepositoryMock.findById).toHaveBeenCalledWith(getServiceByIdDTO.id);

    expect(response).toEqual({
      status: 200,
      result: serviceToBeReturned,
    });
  });

  it('should return correctly if service has not been found', async () => {
    const getServiceByIdDTO = mockGetServiceByIdDTO();

    const serviceRepositoryMock = {
      ...mockServiceRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const getServiceById = new GetServiceById(serviceRepositoryMock);

    const response = await getServiceById.execute(getServiceByIdDTO);

    expect(serviceRepositoryMock.findById).toHaveBeenCalledWith(getServiceByIdDTO.id);

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum serviço cadastrado com o ID informado',
      },
    });
  });

  xit('should return correctly if ServiceRepository throws an exception', async () => {});
});
