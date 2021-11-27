import UpdateHelpCase from './UpdateHelpCase';
import HelpCase from 'domain/entities/HelpCase/HelpCase';
import IHelpCaseRepository from 'domain/ports/HelpCaseRepository';
import { IRequestUpdateHelpCaseDTO } from 'domain/services/dto';
import {
  mockHelpCase,
  mockHelpCaseRepository,
  mockUpdateHelpCaseDTO,
} from '@testUtils/helpCasesMocks';

describe('Service: UpdateHelpCase', () => {
  it('should return correctly if helpCase was found and successfully updated', async () => {
    const updateHelpCaseDTO = mockUpdateHelpCaseDTO();
    const notUpdatedHelpCase = new HelpCase({
      ...mockHelpCase(),
      id: updateHelpCaseDTO.id,
    });
    const updatedHelpCase = new HelpCase(updateHelpCaseDTO);

    const helpCaseRepositoryMock: IHelpCaseRepository = {
      ...mockHelpCaseRepository(),
      findById: jest.fn().mockResolvedValue({ data: notUpdatedHelpCase }),
      update: jest.fn().mockResolvedValue({ data: updatedHelpCase }),
    };

    const updateHelpCase = new UpdateHelpCase(helpCaseRepositoryMock);

    const response = await updateHelpCase.execute(updateHelpCaseDTO);

    expect(helpCaseRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(helpCaseRepositoryMock.findById).toHaveBeenCalledWith(updateHelpCaseDTO.id);
    expect(helpCaseRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(helpCaseRepositoryMock.update).toHaveBeenCalledWith(updatedHelpCase);

    expect(response).toEqual({
      status: 200,
      result: updatedHelpCase,
    });
  });

  it('should return correctly if helpCase has not been found', async () => {
    const updateHelpCaseDTO = mockUpdateHelpCaseDTO();

    const helpCaseRepositoryMock: IHelpCaseRepository = {
      ...mockHelpCaseRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const updateHelpCase = new UpdateHelpCase(helpCaseRepositoryMock);

    const response = await updateHelpCase.execute(updateHelpCaseDTO);

    expect(helpCaseRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(helpCaseRepositoryMock.findById).toHaveBeenCalledWith(updateHelpCaseDTO.id);
    expect(helpCaseRepositoryMock.update).not.toHaveBeenCalled();

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum caso de ajuda cadastrado com o ID informado',
      },
    });
  });

  it('should return correctly if HelpCase entity throws an exception', async () => {
    const updateHelpCaseDTO: IRequestUpdateHelpCaseDTO = {
      ...mockUpdateHelpCaseDTO(),
      poolMoneyUrl: 'invalid-url',
    };

    const helpCaseRepositoryMock: IHelpCaseRepository = {
      ...mockHelpCaseRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockHelpCase() }),
    };

    const updateHelpCase = new UpdateHelpCase(helpCaseRepositoryMock);

    const response = await updateHelpCase.execute(updateHelpCaseDTO);

    expect(helpCaseRepositoryMock.update).not.toHaveBeenCalled();
    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Caso de ajuda inválido',
        errorsList: ['URL da vaquinha do caso deve ser uma URL válida'],
      },
    });
  });

  it('should return correctly if HelpCaseRepository throws an exception', async () => {
    const helpCaseRepositoryMock: IHelpCaseRepository = {
      ...mockHelpCaseRepository(),
      findById: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const updateHelpCase = new UpdateHelpCase(helpCaseRepositoryMock);

    const response = await updateHelpCase.execute(mockUpdateHelpCaseDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
