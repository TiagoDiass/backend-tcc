import Transaction from 'domain/entities/Transaction';
import InvalidServiceError from 'domain/exceptions/InvalidServiceError';
import InvalidTransactionError from 'domain/exceptions/InvalidTransactionError';

describe('Transaction entity', () => {
  it('should instantiate a new Transaction correctly without passing an id', () => {
    const transaction = new Transaction({
      title: 'Compras de alguns medicamentos',
      value: 5000, // 50 reais
      type: 'withdraw',
      date: '2019-10-01',
    });

    expect(transaction.id).toBeTruthy();
    expect(transaction).toMatchObject({
      title: 'Compras de alguns medicamentos',
      value: 5000,
      type: 'withdraw',
      date: '2019-10-01',
    });
  });

  it('should instantiate a new Transaction correctly passing an id in parameters', () => {
    const transaction = new Transaction({
      id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
      title: 'Compras',
      value: 3500,
      type: 'deposit',
      date: '2021-05-18',
    });

    expect(transaction).toMatchObject({
      id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
      title: 'Compras',
      value: 3500,
      type: 'deposit',
      date: '2021-05-18',
    });
  });

  it('should throw an InvalidTransactionError if id is not an UUID', () => {
    let error;

    try {
      new Transaction({
        id: 'id sem ser uuid',
        title: 'titulo da transação',
        value: 3500,
        type: 'deposit',
        date: '2021-05-18',
      });
    } catch (err) {
      error = err;
    }

    expect(error.type).toBe('invalid-transaction-error');
    expect(error.errorsList).toEqual([
      'ID da transação deve estar no padrão UUID V4',
    ]);
  });

  it('should throw an InvalidTransactionError if title has less than 5 characters', () => {
    let error;

    try {
      new Transaction({
        title: 'xii',
        value: 3500,
        type: 'deposit',
        date: '2021-05-18',
      });
    } catch (err) {
      error = err;
    }

    expect(error.type).toBe('invalid-transaction-error');
    expect(error.errorsList).toEqual([
      'título da transação deve conter pelo menos 5 caracteres',
    ]);
  });

  it('should throw an InvalidTransactionError if value is not greater than 0', () => {
    let error;

    try {
      new Transaction({
        title: 'Comprinhas',
        value: -5,
        type: 'deposit',
        date: '2021-05-18',
      });
    } catch (err) {
      error = err;
    }

    expect(error.type).toBe('invalid-transaction-error');
    expect(error.errorsList).toEqual([
      'valor da transação deve ser maior que zero',
    ]);
  });

  it('should throw an InvalidTransactionError if date is not in the correct format(YYYY-MM-DD)', () => {
    let error;

    try {
      new Transaction({
        title: 'Comprinhas',
        value: 15,
        type: 'deposit',
        date: '15/12/2021',
      });
    } catch (err) {
      error = err;
    }

    expect(error.type).toBe('invalid-transaction-error');
    expect(error.errorsList).toEqual([
      'data da transação deve estar no formato yyyy-mm-dd',
    ]);
  });
});
