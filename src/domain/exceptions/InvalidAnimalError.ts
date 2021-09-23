export default class InvalidAnimalError extends Error {
  public readonly type = 'invalid-animal-error';
  public errorsList: string[];

  constructor(errorsList: string[]) {
    super('Animal inválido');

    Error.captureStackTrace(this, InvalidAnimalError);

    this.name = 'InvalidAnimalError';
    this.errorsList = errorsList;
  }
}
