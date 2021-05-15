export default class InvalidServiceError extends Error {
  public errorsList: string[];

  constructor(errorsList: string[]) {
    let m = 'Serviço inválido';
    super(m);

    Error.captureStackTrace(this, InvalidServiceError);

    this.name = 'InvalidServiceError';
    this.errorsList = errorsList;
  }
}
