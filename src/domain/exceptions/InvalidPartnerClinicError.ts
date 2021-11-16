export default class InvalidPartnerClinicError extends Error {
  public readonly type = 'invalid-partner-clinic-error';
  public errorsList: string[];

  constructor(errorsList: string[]) {
    super('Clínica parceira inválida');

    Error.captureStackTrace(this, InvalidPartnerClinicError);

    this.name = 'InvalidPartnerClinicError';
    this.errorsList = errorsList;
  }
}
