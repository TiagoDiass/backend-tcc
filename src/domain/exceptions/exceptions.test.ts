import InvalidServiceError from './InvalidServiceError';
import InvalidTransactionError from './InvalidTransactionError';
import InvalidAnimalError from './InvalidAnimalError';
import InvalidMedicineError from './InvalidMedicineError';
import InvalidAddressError from './InvalidAddressError';
import InvalidPartnerClinicError from './InvalidPartnerClinicError';
import InvalidHelpCaseError from './InvalidHelpCaseError';

describe('Exceptions test', () => {
  it('InvalidTransactionError: it should have the correct message and type', () => {
    const error = new InvalidTransactionError([]);
    expect(error.message).toBe('Transação inválida');
    expect(error.type).toBe('invalid-transaction-error');
  });

  it('InvalidServiceError: it should have the correct message and type', () => {
    const error = new InvalidServiceError([]);
    expect(error.message).toBe('Serviço inválido');
    expect(error.type).toBe('invalid-service-error');
  });

  it('InvalidAnimalError: it should have the correct message and type', () => {
    const error = new InvalidAnimalError([]);
    expect(error.message).toBe('Animal inválido');
    expect(error.type).toBe('invalid-animal-error');
  });

  it('InvalidMedicineError: it should have the correct message and type', () => {
    const error = new InvalidMedicineError([]);
    expect(error.message).toBe('Medicamento inválido');
    expect(error.type).toBe('invalid-medicine-error');
  });

  it('InvalidAddressError: it should have the correct message and type', () => {
    const error = new InvalidAddressError([]);
    expect(error.message).toBe('Endereço inválido');
    expect(error.type).toBe('invalid-address-error');
  });

  it('InvalidPartnerClinicError: it should have the correct message and type', () => {
    const error = new InvalidPartnerClinicError([]);
    expect(error.message).toBe('Clínica parceira inválida');
    expect(error.type).toBe('invalid-partner-clinic-error');
  });

  it('InvalidHelpCaseError: it should have the correct message and type', () => {
    const error = new InvalidHelpCaseError([]);
    expect(error.message).toBe('Caso de ajuda inválido');
    expect(error.type).toBe('invalid-help-case-error');
  });
});
