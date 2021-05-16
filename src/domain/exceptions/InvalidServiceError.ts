export default class InvalidServiceError extends Error {
  public type = 'invalid-service-error';
  public errorsList: string[];

  constructor(errorsList: string[]) {
    super('Serviço inválido');

    Error.captureStackTrace(this, InvalidServiceError);

    this.name = 'InvalidServiceError';
    this.errorsList = errorsList;
  }
}
