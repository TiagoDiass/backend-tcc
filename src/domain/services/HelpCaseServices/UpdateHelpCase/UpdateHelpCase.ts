import HelpCase from 'domain/entities/HelpCase/HelpCase';
import IHelpCaseRepository from 'domain/ports/HelpCaseRepository';
import { IRequestUpdateHelpCaseDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class UpdateHelpCase {
  constructor(private readonly productRepository: IHelpCaseRepository) {}

  async execute(
    updateHelpCaseDTO: IRequestUpdateHelpCaseDTO
  ): Promise<DomainServiceResult<HelpCase>> {
    try {
      const { data: helpCaseExists } = await this.productRepository.findById(updateHelpCaseDTO.id);

      if (!helpCaseExists) {
        return {
          status: 404,
          error: {
            message: 'Não há nenhum caso de ajuda cadastrado com o ID informado',
          },
        };
      }

      const updatedHelpCase = new HelpCase(updateHelpCaseDTO);

      const repoResult = await this.productRepository.update(updatedHelpCase);

      return {
        status: 200,
        result: repoResult.data,
      };
    } catch (error: any) {
      const isInvalidHelpCaseError = error.type === 'invalid-help-case-error';

      return {
        status: isInvalidHelpCaseError ? 400 : 500,
        error: {
          message: error.message,
          errorsList: isInvalidHelpCaseError ? error.errorsList : [],
        },
      };
    }
  }
}
