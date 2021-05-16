import Service from 'domain/entities/Service';
import ListServices from 'domain/services/ListServices';

describe('ListServices Service', () => {
  it('should call serviceRepository.list() and return correctly', async () => {
    const servicesToBeReturned = [
      new Service({ title: 'Serviço bom', description: 'Serviço monstro' }),
      new Service({ title: 'Serviço ruim', description: 'Serviço chato' }),
    ];

    const serviceRepositoryMock = {
      list: jest.fn().mockResolvedValue({
        data: servicesToBeReturned,
      }),
      save: jest.fn(),
    };

    const listServices = new ListServices(serviceRepositoryMock);

    const response = await listServices.execute();

    expect(serviceRepositoryMock.list).toHaveBeenCalled();
    expect(response).toEqual({
      status: 200,
      result: servicesToBeReturned,
    });
  });

  it('should call return correctly in cases of error', async () => {
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
