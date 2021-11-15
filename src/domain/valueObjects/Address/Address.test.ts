import Address from './Address';

describe('ValueObject: Address', () => {
  it('should instantiate a new Address correctly', () => {
    const address = new Address({
      cep: '13802-310',
      street: 'Rua Moizéz Bento Moretto',
      number: 260,
      complement: '',
      district: 'Parque das Laranjeiras',
      city: 'Mogi Mirim',
      state: 'SP',
    });

    expect(address).toMatchObject({
      cep: '13802-310',
      street: 'Rua Moizéz Bento Moretto',
      number: 260,
      district: 'Parque das Laranjeiras',
      city: 'Mogi Mirim',
      state: 'SP',
    });
  });
});
