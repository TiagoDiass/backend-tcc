import Transaction from 'domain/entities/Transaction';

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
      id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
      title: 'Compras',
      value: 3500,
      type: 'deposit',
      date: '2021-05-18 19:15:00',
    });

    expect(transaction).toMatchObject({
      id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
      title: 'Compras',
      value: 3500,
      type: 'deposit',
      date: '2021-05-18 19:15:00',
    });
  });

  it('should return an InvalidTransactionError if id is not an UUID', () => {
    let error;

    try {
      new Transaction({
        id: 'id sem ser uuid',
        title: 'titulo da transação',
        value: 3500,
        type: 'deposit',
        date: '2021-05-18 19:15:00',
      });
    } catch (err) {
      error = err;
    }

    expect(error.message).toBe('Transação inválida');
    expect(error.errorsList).toEqual(['ID deve estar no padrão UUID V4']);
  });

  it('should return an InvalidTransactionError if title has less than 5 characters', () => {
    let error;

    try {
      new Transaction({
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
