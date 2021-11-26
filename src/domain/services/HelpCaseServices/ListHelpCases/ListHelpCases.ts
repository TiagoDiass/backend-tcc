import HelpCase from 'domain/entities/HelpCase/HelpCase';
import IHelpCaseRepository from 'domain/ports/HelpCaseRepository';
import { DomainServiceResult } from 'domain/services/types';

export default class ListHelpCases {
  constructor(private readonly helpCaseRepository: IHelpCaseRepository) {}

  public async execute(): Promise<DomainServiceResult<HelpCase[]>> {
    try {
      const repoResult = await this.helpCaseRepository.list();

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
