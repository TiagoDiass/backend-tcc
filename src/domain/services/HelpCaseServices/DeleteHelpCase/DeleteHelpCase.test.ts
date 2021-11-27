import DeleteHelpCase from './DeleteHelpCase';
import HelpCaseRepository from 'domain/ports/HelpCaseRepository';
import {
  mockDeleteHelpCaseDTO,
  mockHelpCase,
  mockHelpCaseRepository,
} from '@testUtils/helpCasesMocks';

describe('Service: DeleteHelpCase', () => {
  it('should return correctly if helpCase has been deleted successfully', async () => {
    const deleteHelpCaseDTO = mockDeleteHelpCaseDTO();

    const helpCaseRepositoryMock: HelpCaseRepository = {
      ...mockHelpCaseRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockHelpCase() }),
      delete: jest.fn().mockResolvedValue({ data: deleteHelpCaseDTO.id }),
    };

    const deleteHelpCase = new DeleteHelpCase(helpCaseRepositoryMock);

    const response = await deleteHelpCase.execute(deleteHelpCaseDTO);

    expect(helpCaseRepositoryMock.delete).toHaveBeenCalledWith(deleteHelpCaseDTO.id);

    expect(response).toEqual({
      status: 200,
      result: deleteHelpCaseDTO.id,
    });
  });

  it('should return correctly if there is no helpCase with the received id', async () => {
    const helpCaseRepositoryMock: HelpCaseRepository = {
      ...mockHelpCaseRepository(),
      findById: jest.fn().mockResolvedValue({ status: 404, data: null }),
    };

    const deleteHelpCase = new DeleteHelpCase(helpCaseRepositoryMock);

    const deleteHelpCaseDTO = mockDeleteHelpCaseDTO();

    const response = await deleteHelpCase.execute(deleteHelpCaseDTO);

    expect(helpCaseRepositoryMock.findById).toHaveBeenCalledWith(deleteHelpCaseDTO.id);

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum caso de ajuda cadastrado com o ID informado',
      },
    });
  });

  it('should return correctly if HelpCaseRepository throws an exception', async () => {
    const helpCaseRepositoryMock: HelpCaseRepository = {
      ...mockHelpCaseRepository(),
      findById: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const deleteHelpCase = new DeleteHelpCase(helpCaseRepositoryMock);

    const response = await deleteHelpCase.execute(mockDeleteHelpCaseDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
