import {
  mockPartnerClinic,
  mockPartnerClinicRepository,
  mockUpdatePartnerClinicDTO,
} from '@testUtils/partnerClinicsMocks';
import PartnerClinic from 'domain/entities/PartnerClinic/PartnerClinic';
import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';
import { IRequestUpdatePartnerClinicDTO } from 'domain/services/dto';
import { Address } from 'domain/valueObjects';
import UpdatePartnerClinic from './UpdatePartnerClinic';

describe('Service: UpdatePartnerClinic', () => {
  it('should return correctly if partner clinic was found and successfully updated', async () => {
    const updatePartnerClinicDTO = mockUpdatePartnerClinicDTO();
    const notUpdatedPartnerClinic = new PartnerClinic({
      ...mockPartnerClinic(),
      id: updatePartnerClinicDTO.id,
    });
    const updatedPartnerClinic = new PartnerClinic({
      ...updatePartnerClinicDTO,
      address: new Address(updatePartnerClinicDTO.address),
    });

    const partnerClinicRepositoryMock: IPartnerClinicRepository = {
      ...mockPartnerClinicRepository(),
      findById: jest.fn().mockResolvedValue({ data: notUpdatedPartnerClinic }),
      update: jest.fn().mockResolvedValue({ data: updatedPartnerClinic }),
    };

    const updatePartnerClinic = new UpdatePartnerClinic(partnerClinicRepositoryMock);

    const response = await updatePartnerClinic.execute(updatePartnerClinicDTO);

    expect(partnerClinicRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(partnerClinicRepositoryMock.findById).toHaveBeenCalledWith(updatePartnerClinicDTO.id);
    expect(partnerClinicRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(partnerClinicRepositoryMock.update).toHaveBeenCalledWith(updatedPartnerClinic);

    expect(response).toEqual({
      status: 200,
      result: updatedPartnerClinic,
    });
  });

  it('should return correctly if partner clinic has not been found', async () => {
    const updatePartnerClinicDTO = mockUpdatePartnerClinicDTO();

    const partnerClinicRepositoryMock: IPartnerClinicRepository = {
      ...mockPartnerClinicRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const updatePartnerClinic = new UpdatePartnerClinic(partnerClinicRepositoryMock);

    const response = await updatePartnerClinic.execute(updatePartnerClinicDTO);

    expect(partnerClinicRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(partnerClinicRepositoryMock.findById).toHaveBeenCalledWith(updatePartnerClinicDTO.id);
    expect(partnerClinicRepositoryMock.update).not.toHaveBeenCalled();

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhuma clínica parceira cadastrada com o ID informado',
      },
    });
  });

  it('should return correctly if PartnerClinic entity throws an exception', async () => {
    const updatePartnerClinicDTO: IRequestUpdatePartnerClinicDTO = {
      ...mockUpdatePartnerClinicDTO(),
      name: '12', // invalid name, it should have at least 4 characters
    };

    const partnerClinicRepositoryMock: IPartnerClinicRepository = {
      ...mockPartnerClinicRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockPartnerClinic() }),
    };

    const updatePartnerClinic = new UpdatePartnerClinic(partnerClinicRepositoryMock);

    const response = await updatePartnerClinic.execute(updatePartnerClinicDTO);

    expect(partnerClinicRepositoryMock.update).not.toHaveBeenCalled();
    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Clínica parceira inválida',
        errorsList: ['nome da clínica deve conter pelo menos 4 caracteres'],
      },
    });
  });

  it('should return correctly if Address entity throws an exception', async () => {
    const updatePartnerClinicDTO: IRequestUpdatePartnerClinicDTO = {
      ...mockUpdatePartnerClinicDTO(),
      address: {
        ...mockUpdatePartnerClinicDTO().address,
        state: 'invalid-state',
        cep: 'invalid-cep',
      },
    };

    const partnerClinicRepositoryMock: IPartnerClinicRepository = {
      ...mockPartnerClinicRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockPartnerClinic() }),
    };

    const updatePartnerClinic = new UpdatePartnerClinic(partnerClinicRepositoryMock);

    const response = await updatePartnerClinic.execute(updatePartnerClinicDTO);

    expect(partnerClinicRepositoryMock.update).not.toHaveBeenCalled();
    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Endereço inválido',
        errorsList: [
          'CEP do endereço informado está inválido, deve ser uma string no formato xxxxx-xxx',
          'Estado do endereço informado é inválido',
        ],
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

    const updatePartnerClinic = new UpdatePartnerClinic(partnerClinicRepositoryMock);

    const response = await updatePartnerClinic.execute(mockUpdatePartnerClinicDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
