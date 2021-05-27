import InvalidServiceError from 'domain/exceptions/InvalidServiceError';
import InvalidTransactionError from 'domain/exceptions/InvalidTransactionError';

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
});
