import { ListServices } from 'domain/services/ServiceServices';
import { mockService, mockServiceRepository } from '../../utils/servicesMocks';

describe('ListServices Service', () => {
  it('should call serviceRepository.list() and return correctly', async () => {
    const servicesToBeReturned = [mockService(), mockService()];

    const serviceRepositoryMock = {
      ...mockServiceRepository(),

      list: jest.fn().mockResolvedValue({
        data: servicesToBeReturned,
      }),
    };

    const listServices = new ListServices(serviceRepositoryMock);

    const response = await listServices.execute();

    expect(serviceRepositoryMock.list).toHaveBeenCalled();
    expect(response).toEqual({
      status: 200,
      result: servicesToBeReturned,
    });
  });

  it('should return correctly in cases of error', async () => {
    const serviceRepositoryMock = {
      list: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
      save: jest.fn(),
    };

    const listServices = new ListServices(serviceRepositoryMock);

    const response = await listServices.execute();

    expect(serviceRepositoryMock.list).toHaveBeenCalled();
    expect(response).toEqual({
      status: 500,
      error: { message: 'Erro mockado' },
    });
  });
});
