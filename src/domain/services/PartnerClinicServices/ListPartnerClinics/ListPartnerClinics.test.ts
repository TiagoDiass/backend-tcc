import { mockPartnerClinic, mockPartnerClinicRepository } from '@testUtils/partnerClinicsMocks';
import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';
import ListPartnerClinics from './ListPartnerClinics';

describe('Service: ListPartnerClinics', () => {
  it('should call partnerClinicRepository.list() and return correctly', async () => {
    const clinicsToBeReturned = [mockPartnerClinic(), mockPartnerClinic()];

    const partnerClinicRepositoryMock: IPartnerClinicRepository = {
      ...mockPartnerClinicRepository(),

      list: jest.fn().mockResolvedValue({
        data: clinicsToBeReturned,
      }),
    };

    const listPartnerClinics = new ListPartnerClinics(partnerClinicRepositoryMock);

    const response = await listPartnerClinics.execute();

    expect(partnerClinicRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 200,
      result: clinicsToBeReturned,
    });
  });

  it('should return correctly if PartnerClinicRepository throws an exception', async () => {
    const partnerClinicRepositoryMock: IPartnerClinicRepository = {
      ...mockPartnerClinicRepository(),

      list: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const listPartnerClinics = new ListPartnerClinics(partnerClinicRepositoryMock);

    const response = await listPartnerClinics.execute();

    expect(partnerClinicRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 500,
      error: { message: 'Erro mockado' },
    });
  });
});
