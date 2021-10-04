export default class InvalidProductError extends Error {
  public readonly type = 'invalid-product-error';
  public errorsList: string[];

  constructor(errorsList: string[]) {
    super('Produto inválido');

    Error.captureStackTrace(this, InvalidProductError);

    this.name = 'InvalidProductError';
    this.errorsList = errorsList;
  }
}
