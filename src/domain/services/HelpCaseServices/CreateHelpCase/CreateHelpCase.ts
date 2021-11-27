import HelpCase from 'domain/entities/HelpCase/HelpCase';
import IHelpCaseRepository from 'domain/ports/HelpCaseRepository';
import { IRequestCreateHelpCaseDTO } from 'domain/services/dto';
import { DomainServiceResult } from 'domain/services/types';

export default class CreateHelpCase {
  constructor(private readonly helpCaseRepository: IHelpCaseRepository) {}

  public async execute(
    createHelpCaseDTO: IRequestCreateHelpCaseDTO
  ): Promise<DomainServiceResult<HelpCase>> {
    try {
      const helpCase = new HelpCase(createHelpCaseDTO);

      const repoResult = await this.helpCaseRepository.save(helpCase);

      return {
        status: 201,
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
