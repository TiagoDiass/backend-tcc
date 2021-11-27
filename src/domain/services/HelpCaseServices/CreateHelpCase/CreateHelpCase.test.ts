import CreateHelpCase from './CreateHelpCase';
import { IRequestCreateHelpCaseDTO } from 'domain/services/dto';
import IHelpCaseRepository from 'domain/ports/HelpCaseRepository';
import { mockCreateHelpCaseDTO, mockHelpCaseRepository } from '@testUtils/helpCasesMocks';

const UUID_MOCK = '1e16f407-1cef-427c-af39-e9c3efcbd18e';

jest.mock('uuid', () => ({
  v4: jest.fn().mockImplementation(() => UUID_MOCK),
}));

describe('Service: CreateHelpCase', () => {
  it('should call helpCaseRepository.save() and return correctly', async () => {
    const helpCaseRepositoryMock: IHelpCaseRepository = {
      ...mockHelpCaseRepository(),

      save: jest.fn().mockImplementationOnce(helpCase => ({
        data: helpCase,
      })),
    };

    const createHelpCase = new CreateHelpCase(helpCaseRepositoryMock);

    const createHelpCaseDTO = mockCreateHelpCaseDTO();

    const response = await createHelpCase.execute(createHelpCaseDTO);

    expect(helpCaseRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(helpCaseRepositoryMock.save).toHaveBeenCalledWith({
      id: UUID_MOCK,
      ...createHelpCaseDTO,
    });

    expect(response).toEqual({
      status: 201,
      result: {
        id: UUID_MOCK,
        ...createHelpCaseDTO,
      },
    });
  });

  it('should return correctly if HelpCase entity throws an exception', async () => {
    const helpCaseRepositoryMock = mockHelpCaseRepository();

    const createHelpCase = new CreateHelpCase(helpCaseRepositoryMock);

    const createHelpCaseDTO: IRequestCreateHelpCaseDTO = {
      ...mockCreateHelpCaseDTO(),
      title: '123', // invalid name, it has to have at least 5 characters
    };

    const response = await createHelpCase.execute(createHelpCaseDTO);

    expect(helpCaseRepositoryMock.save).not.toHaveBeenCalled();

    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Caso de ajuda inválido',
        errorsList: ['título do caso de ajuda deve conter pelo menos 5 caracteres'],
      },
    });
  });

  it('should return correctly if HelpCaseRepository throws an exception', async () => {
    const partnerClinicRepositoryMock: IHelpCaseRepository = {
      ...mockHelpCaseRepository(),

      save: jest.fn().mockImplementationOnce(() => {
        throw new Error('Erro mockado');
      }),
    };

    const createHelpCase = new CreateHelpCase(partnerClinicRepositoryMock);

    const response = await createHelpCase.execute(mockCreateHelpCaseDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
