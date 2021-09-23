import InvalidServiceError from './InvalidServiceError';
import InvalidTransactionError from './InvalidTransactionError';
import InvalidAnimalError from './InvalidAnimalError';

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
});
