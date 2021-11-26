export default class InvalidHelpCaseError extends Error {
  public readonly type = 'invalid-help-case-error';
  public errorsList: string[];

  constructor(errorsList: string[]) {
    super('Caso de ajuda inválido');

    Error.captureStackTrace(this, InvalidHelpCaseError);

    this.name = 'InvalidHelpCaseError';
    this.errorsList = errorsList;
  }
}
