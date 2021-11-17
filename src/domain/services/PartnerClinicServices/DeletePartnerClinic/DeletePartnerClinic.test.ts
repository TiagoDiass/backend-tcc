import DeletePartnerClinic from './DeletePartnerClinic';
import {
  mockDeletePartnerClinicDTO,
  mockPartnerClinic,
  mockPartnerClinicRepository,
} from '@testUtils/partnerClinicsMocks';
import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';

describe('Service: DeletePartnerClinic', () => {
  it('should return correctly if clinic has been deleted successfully', async () => {
    const deletePartnerClinicDTO = mockDeletePartnerClinicDTO();

    const partnerClinicRepositoryMock: IPartnerClinicRepository = {
      ...mockPartnerClinicRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockPartnerClinic() }),
      delete: jest.fn().mockResolvedValue({ data: deletePartnerClinicDTO.id }),
    };

    const deletePartnerClinic = new DeletePartnerClinic(partnerClinicRepositoryMock);

    const response = await deletePartnerClinic.execute(deletePartnerClinicDTO);

    expect(partnerClinicRepositoryMock.delete).toHaveBeenCalledWith(deletePartnerClinicDTO.id);

    expect(response).toEqual({
      status: 200,
      result: deletePartnerClinicDTO.id,
    });
  });

  it('should return correctly if there is no clinic with the received id', async () => {
    const partnerClinicRepositoryMock: IPartnerClinicRepository = {
      ...mockPartnerClinicRepository(),
      findById: jest.fn().mockResolvedValue({ status: 404, data: null }),
    };

    const deletePartnerClinic = new DeletePartnerClinic(partnerClinicRepositoryMock);

    const deletePartnerClinicDTO = mockDeletePartnerClinicDTO();

    const response = await deletePartnerClinic.execute(deletePartnerClinicDTO);

    expect(partnerClinicRepositoryMock.findById).toHaveBeenCalledWith(deletePartnerClinicDTO.id);

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

    const deletePartnerClinic = new DeletePartnerClinic(partnerClinicRepositoryMock);

    const response = await deletePartnerClinic.execute(mockDeletePartnerClinicDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
