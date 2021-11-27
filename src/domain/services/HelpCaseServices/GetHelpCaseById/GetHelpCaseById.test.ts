import GetHelpCaseById from './GetHelpCaseById';
import {
  mockGetHelpCaseByIdDTO,
  mockHelpCase,
  mockHelpCaseRepository,
} from '@testUtils/helpCasesMocks';
import IHelpCaseRepository from 'domain/ports/HelpCaseRepository';

describe('Service: GetHelpCaseById', () => {
  it('should return correctly if helpCase has been found', async () => {
    const getHelpCaseByIdDTO = mockGetHelpCaseByIdDTO();
    const helpCaseToBeReturned = mockHelpCase();

    const helpCaseRepositoryMock: IHelpCaseRepository = {
      ...mockHelpCaseRepository(),
      findById: jest.fn().mockResolvedValue({ data: helpCaseToBeReturned }),
    };

    const getHelpCaseById = new GetHelpCaseById(helpCaseRepositoryMock);
    const response = await getHelpCaseById.execute(getHelpCaseByIdDTO);

    expect(helpCaseRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(helpCaseRepositoryMock.findById).toHaveBeenCalledWith(getHelpCaseByIdDTO.id);
    expect(response).toEqual({
      status: 200,
      result: helpCaseToBeReturned,
    });
  });

  it('should return correctly if helpCase has not been found', async () => {
    const getHelpCaseByIdDTO = mockGetHelpCaseByIdDTO();

    const helpCaseRepositoryMock: IHelpCaseRepository = {
      ...mockHelpCaseRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const getHelpCaseById = new GetHelpCaseById(helpCaseRepositoryMock);
    const response = await getHelpCaseById.execute(getHelpCaseByIdDTO);

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum caso de ajuda cadastrado com o ID informado',
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

    const getHelpCaseById = new GetHelpCaseById(helpCaseRepositoryMock);
    const response = await getHelpCaseById.execute(mockGetHelpCaseByIdDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
