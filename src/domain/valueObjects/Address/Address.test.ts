import Address from './Address';

const validAddress = {
  cep: '13802-310',
  street: 'Rua Moizéz Bento Moretto',
  number: 260,
  district: 'Parque das Laranjeiras',
  city: 'Mogi Mirim',
  state: 'SP',
} as const;

describe('ValueObject: Address', () => {
  it('should instantiate a new Address correctly', () => {
    const address = new Address({
      cep: '13802-310',
      street: 'Rua Moizéz Bento Moretto',
      number: 260,
      district: 'Parque das Laranjeiras',
      city: 'Mogi Mirim',
      state: 'SP',
    });

    expect(address).toMatchObject({
      cep: '13802-310',
      street: 'Rua Moizéz Bento Moretto',
      number: 260,
      complement: '',
      district: 'Parque das Laranjeiras',
      city: 'Mogi Mirim',
      state: 'SP',
    });
  });

  it('should throw an InvalidAddressError if cep is not a string', () => {
    let error;

    try {
      new Address({
        ...validAddress,
        cep: 123 as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-address-error');
    expect(error.errorsList).toEqual(['CEP do endereço deve ser uma string']);
  });

  it('should throw an InvalidAddressError if cep is not valid', () => {
    let error;

    try {
      new Address({
        ...validAddress,
        cep: 'invalid-cep',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-address-error');
    expect(error.errorsList).toEqual([
      'CEP do endereço informado está inválido, deve ser uma string no formato xxxxx-xxx',
    ]);
  });

  it('should throw an InvalidAddressError if street is not a string', () => {
    let error;

    try {
      new Address({
        ...validAddress,
        street: undefined as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-address-error');
    expect(error.errorsList).toEqual(['Rua do endereço deve ser uma string']);
  });

  it('should throw an InvalidAddressError if number is not a number', () => {
    let error;

    try {
      new Address({
        ...validAddress,
        number: undefined as unknown as number,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-address-error');
    expect(error.errorsList).toEqual([
      'Número do endereço deve ser do tipo number e maior que zero',
    ]);
  });

  it('should throw an InvalidAddressError if number is <= 0', () => {
    let error;

    try {
      new Address({
        ...validAddress,
        number: -15,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-address-error');
    expect(error.errorsList).toEqual([
      'Número do endereço deve ser do tipo number e maior que zero',
    ]);
  });

  it('should throw an InvalidAddressError if complement is not a string', () => {
    let error;

    try {
      new Address({
        ...validAddress,
        complement: 123 as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-address-error');
    expect(error.errorsList).toEqual(['Complemento do endereço deve ser uma string']);
  });

  it('should throw an InvalidAddressError if district is not a string', () => {
    let error;

    try {
      new Address({
        ...validAddress,
        district: undefined as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-address-error');
    expect(error.errorsList).toEqual(['Bairro do endereço deve ser uma string']);
  });

  it('should throw an InvalidAddressError if city is not a string', () => {
    let error;

    try {
      new Address({
        ...validAddress,
        city: undefined as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-address-error');
    expect(error.errorsList).toEqual(['Cidade do endereço deve ser uma string']);
  });

  it('should throw an InvalidAddressError if state is not a string', () => {
    let error;

    try {
      new Address({
        ...validAddress,
        state: undefined as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-address-error');
    expect(error.errorsList).toEqual(['Estado do endereço deve ser uma string']);
  });

  it('should throw an InvalidAddressError if state is not valid', () => {
    let error;

    try {
      new Address({
        ...validAddress,
        state: 'invalid-state',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-address-error');
    expect(error.errorsList).toEqual(['Estado do endereço deve conter somente 2 caracteres']);
  });
});
