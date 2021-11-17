import {
  mockCreatePartnerClinicDTO,
  mockPartnerClinicRepository,
} from '@testUtils/partnerClinicsMocks';
import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';
import { IRequestCreatePartnerClinicDTO } from 'domain/services/dto';
import CreatePartnerClinic from './CreatePartnerClinic';

const UUID_MOCK = '1e16f407-1cef-427c-af39-e9c3efcbd18e';

jest.mock('uuid', () => ({
  v4: jest.fn().mockImplementation(() => UUID_MOCK),
}));

describe('Service: CreatePartnerClinic', () => {
  it('should call partnerClinicRepository.save() and return correctly', async () => {
    const partnerClinicRepositoryMock: IPartnerClinicRepository = {
      ...mockPartnerClinicRepository(),

      save: jest.fn().mockImplementationOnce(partnerClinic => ({
        data: partnerClinic,
      })),
    };

    const createPartnerClinic = new CreatePartnerClinic(partnerClinicRepositoryMock);

    const createPartnerClinicDTO: IRequestCreatePartnerClinicDTO = mockCreatePartnerClinicDTO();

    const response = await createPartnerClinic.execute(createPartnerClinicDTO);

    expect(partnerClinicRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(partnerClinicRepositoryMock.save).toHaveBeenCalledWith({
      id: UUID_MOCK,
      ...createPartnerClinicDTO,
    });

    expect(response).toEqual({
      status: 201,
      result: {
        id: UUID_MOCK,
        ...createPartnerClinicDTO,
      },
    });
  });

  it('should return correctly if PartnerClinic entity throws an exception', async () => {
    const partnerClinicRepositoryMock = mockPartnerClinicRepository();

    const createPartnerClinic = new CreatePartnerClinic(partnerClinicRepositoryMock);

    const createPartnerClinicDTO: IRequestCreatePartnerClinicDTO = {
      ...mockCreatePartnerClinicDTO(),
      name: '123', // invalid name, it has to have at least 4 characters
    };

    const response = await createPartnerClinic.execute(createPartnerClinicDTO);

    expect(partnerClinicRepositoryMock.save).not.toHaveBeenCalled();

    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Clínica parceira inválida',
        errorsList: ['nome da clínica deve conter pelo menos 4 caracteres'],
      },
    });
  });

  it('should return correctly if Address entity throws an exception', async () => {
    const partnerClinicRepositoryMock = mockPartnerClinicRepository();

    const createPartnerClinic = new CreatePartnerClinic(partnerClinicRepositoryMock);

    const createPartnerClinicDTO: IRequestCreatePartnerClinicDTO = {
      ...mockCreatePartnerClinicDTO(),
      name: '123', // invalid name, it has to have at least 4 characters
      address: {
        ...mockCreatePartnerClinicDTO().address,
        state: 'invalid-state',
        cep: 'invalid-cep',
      },
    };

    const response = await createPartnerClinic.execute(createPartnerClinicDTO);

    expect(partnerClinicRepositoryMock.save).not.toHaveBeenCalled();

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

      save: jest.fn().mockImplementationOnce(() => {
        throw new Error('Erro mockado');
      }),
    };

    const createPartnerClinic = new CreatePartnerClinic(partnerClinicRepositoryMock);

    const response = await createPartnerClinic.execute(mockCreatePartnerClinicDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
