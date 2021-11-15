export default class InvalidAddressError extends Error {
  public readonly type = 'invalid-address-error';
  public errorsList: string[];

  constructor(errorsList: string[]) {
    super('Endereço inválido');

    Error.captureStackTrace(this, InvalidAddressError);

    this.name = 'InvalidAddressError';
    this.errorsList = errorsList;
  }
}
