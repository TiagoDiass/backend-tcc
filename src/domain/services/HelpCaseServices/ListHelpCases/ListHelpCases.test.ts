import ListHelpCases from './ListHelpCases';
import IHelpCaseRepository from 'domain/ports/HelpCaseRepository';
import { mockHelpCase, mockHelpCaseRepository } from '@testUtils/helpCasesMocks';

describe('Service: ListHelpCases', () => {
  it('should call helpCaseRepository.list() and return correctly', async () => {
    const helpCasesToBeReturned = [mockHelpCase(), mockHelpCase()];

    const helpCaseRepositoryMock: IHelpCaseRepository = {
      ...mockHelpCaseRepository(),

      list: jest.fn().mockResolvedValue({
        data: helpCasesToBeReturned,
      }),
    };

    const listHelpCases = new ListHelpCases(helpCaseRepositoryMock);

    const response = await listHelpCases.execute();

    expect(helpCaseRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 200,
      result: helpCasesToBeReturned,
    });
  });

  it('should return correctly if HelpCaseRepository throws an exception', async () => {
    const helpCaseRepositoryMock: IHelpCaseRepository = {
      ...mockHelpCaseRepository(),

      list: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const listHelpCases = new ListHelpCases(helpCaseRepositoryMock);

    const response = await listHelpCases.execute();

    expect(helpCaseRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 500,
      error: { message: 'Erro mockado' },
    });
  });
});
