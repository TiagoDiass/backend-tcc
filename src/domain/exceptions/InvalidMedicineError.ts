export default class InvalidMedicineError extends Error {
  public readonly type = 'invalid-medicine-error';
  public errorsList: string[];

  constructor(errorsList: string[]) {
    super('Medicamento inválido');

    Error.captureStackTrace(this, InvalidMedicineError);

    this.name = 'InvalidMedicineError';
    this.errorsList = errorsList;
  }
}
