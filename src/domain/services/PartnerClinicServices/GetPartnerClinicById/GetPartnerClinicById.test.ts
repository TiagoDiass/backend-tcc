import {
  mockGetPartnerClinicByIdDTO,
  mockPartnerClinic,
  mockPartnerClinicRepository,
} from '@testUtils/partnerClinicsMocks';
import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';
import GetPartnerClinicById from './GetPartnerClinicById';

describe('Service: GetPartnerClinicById', () => {
  it('should return correctly if clinic has been found', async () => {
    const getPartnerClinicByIdDTO = mockGetPartnerClinicByIdDTO();
    const clinicToBeReturned = mockPartnerClinic();

    const partnerClinicRepositoryMock: IPartnerClinicRepository = {
      ...mockPartnerClinicRepository(),
      findById: jest.fn().mockResolvedValue({ data: clinicToBeReturned }),
    };

    const getPartnerClinicById = new GetPartnerClinicById(partnerClinicRepositoryMock);
    const response = await getPartnerClinicById.execute(getPartnerClinicByIdDTO);

    expect(partnerClinicRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(partnerClinicRepositoryMock.findById).toHaveBeenCalledWith(getPartnerClinicByIdDTO.id);
    expect(response).toEqual({
      status: 200,
      result: clinicToBeReturned,
    });
  });

  it('should return correctly if clinic has not been found', async () => {
    const getPartnerClinicByIdDTO = mockGetPartnerClinicByIdDTO();

    const partnerClinicRepositoryMock: IPartnerClinicRepository = {
      ...mockPartnerClinicRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const getPartnerClinicById = new GetPartnerClinicById(partnerClinicRepositoryMock);
    const response = await getPartnerClinicById.execute(getPartnerClinicByIdDTO);

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhuma clínica parceira cadastrada com o ID informado',
      },
    });
  });

  it('should return correctly if PartnerClinicRepository throws an exception', async () => {
    const partnerClinicRepositoryMock: IPartnerClinicRepository = {
      ...mockPartnerClinicRepository(),
      findById: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const getPartnerClinicById = new GetPartnerClinicById(partnerClinicRepositoryMock);
    const response = await getPartnerClinicById.execute(mockGetPartnerClinicByIdDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
