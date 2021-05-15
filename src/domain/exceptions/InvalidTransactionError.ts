export default class InvalidTransactionError extends Error {
  public errorsList: string[];

  constructor(errorsList: string[]) {
    let m = 'Transação inválida';
    super(m);

    Error.captureStackTrace(this, InvalidTransactionError);

    this.name = 'InvalidTransactionError';
    this.errorsList = errorsList;
  }
}
