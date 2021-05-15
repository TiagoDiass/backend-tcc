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
});
