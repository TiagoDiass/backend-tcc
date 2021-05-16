export default class InvalidTransactionError extends Error {
  public readonly type = 'invalid-transaction-error';
  public errorsList: string[];

  constructor(errorsList: string[]) {
    super('Transação inválida');

    Error.captureStackTrace(this, InvalidTransactionError);

    this.name = 'InvalidTransactionError';
    this.errorsList = errorsList;
  }
}
