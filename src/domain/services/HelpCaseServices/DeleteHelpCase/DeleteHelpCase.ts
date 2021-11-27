import HelpCase from 'domain/entities/HelpCase/HelpCase';
import IHelpCaseRepository from 'domain/ports/HelpCaseRepository';
import { IRequestDeleteHelpCaseDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class DeleteHelpCase {
  constructor(private readonly helpCaseRepository: IHelpCaseRepository) {}

  async execute(
    deleteHelpCaseDTO: IRequestDeleteHelpCaseDTO
  ): Promise<DomainServiceResult<HelpCase['id']>> {
    try {
      const { data: helpCaseExists } = await this.helpCaseRepository.findById(deleteHelpCaseDTO.id);

      if (!helpCaseExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum caso de ajuda cadastrado com o ID informado',
          },
        };
      }

      const repoResult = await this.helpCaseRepository.delete(deleteHelpCaseDTO.id);

      return {
        status: 200,
        result: repoResult.data,
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
