import Transaction, {
  ITransactionProperties,
} from 'domain/entities/Transaction';
import InvalidTransactionError from 'domain/exceptions/InvalidTransactionError';

describe('Transaction entity', () => {
  it('should instantiate a new Transaction correctly', () => {
    const transaction = new Transaction({
      title: 'Compras de alguns medicamentos',
      value: 5000, // 50 reais
      type: 'withdraw',
      date: '2021-05-14 12:58:15',
    });

    expect(transaction.id).toBeTruthy();
    expect(transaction).toMatchObject({
      title: 'Compras de alguns medicamentos',
      value: 5000,
      type: 'withdraw',
      date: '2021-05-14 12:58:15',
    });
  });

  it('should instantiate a new Transaction correctly passing an id in parameters', () => {
    const transaction = new Transaction({
      id: 'a little id',
      title: 'Compras',
      value: 3500,
      type: 'deposit',
      date: '2021-05-18 19:15:00',
    });

    expect(transaction).toMatchObject({
      id: 'a little id',
      title: 'Compras',
      value: 3500,
      type: 'deposit',
      date: '2021-05-18 19:15:00',
    });
  });

  it('should return an InvalidTransactionError if title has less than 5 characters', () => {
    let error;

    try {
      new Transaction({
        id: 'a little id',
        title: 'xii',
        value: 3500,
        type: 'deposit',
        date: '2021-05-18 19:15:00',
      });
    } catch (err) {
      error = err;
    }

    expect(error.message).toBe('Transação inválida');
    expect(error.errorsList).toEqual([
      'título da transação deve conter pelo menos 5 caracteres',
    ]);
  });

  it('should return an InvalidTransactionError if value is not greater than 0', () => {
    let error;

    try {
      new Transaction({
        id: 'a little id',
        title: 'Comprinhas',
        value: -5,
        type: 'deposit',
        date: '2021-05-18 19:15:00',
      });
    } catch (err) {
      error = err;
    }

    expect(error.message).toBe('Transação inválida');
    expect(error.errorsList).toEqual([
      'valor da transação deve ser maior que zero',
    ]);
  });
});
