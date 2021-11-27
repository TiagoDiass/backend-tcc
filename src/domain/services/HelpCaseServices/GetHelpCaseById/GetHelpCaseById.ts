import HelpCase from 'domain/entities/HelpCase/HelpCase';
import IHelpCaseRepository from 'domain/ports/HelpCaseRepository';
import { IRequestGetHelpCaseByIdDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class GetHelpCaseById {
  constructor(private readonly helpCaseRepository: IHelpCaseRepository) {}

  public async execute(
    getHelpCaseByIdDTO: IRequestGetHelpCaseByIdDTO
  ): Promise<DomainServiceResult<HelpCase>> {
    try {
      const { data: helpCase } = await this.helpCaseRepository.findById(getHelpCaseByIdDTO.id);

      if (!helpCase) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum caso de ajuda cadastrado com o ID informado',
          },
        };
      }

      return {
        status: 200,
        result: helpCase,
      };
    } catch (error: any) {
      return {
        status: 500,
        error: {
          message: error.message,
        },
      };
    }
  }
}
