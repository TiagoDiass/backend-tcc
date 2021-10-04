import Product from './Product';

describe('Entity: Product', () => {
  it('should instantiate a new Product correctly without passing an id in parameters', () => {
    const product = new Product({
      name: 'Nome do produto',
    });

    expect(product.id).toBeTruthy();
    expect(product.name).toBe('Nome do produto');
    expect(product.description).toBe('');
  });

  it('should instantiate a new Product correctly passing an id in parameters', () => {
    const product = new Product({
      id: '6d21fc1a-4b2d-4102-8c24-2f3cc97680c5',
      name: 'Nome do produto',
    });

    expect(product).toEqual({
      id: '6d21fc1a-4b2d-4102-8c24-2f3cc97680c5',
      name: 'Nome do produto',
      description: '',
    });
  });

  it('should instantiate a new Product correctly passing a description in parameters', () => {
    const product = new Product({
      name: 'Nome do produto',
      description: 'Descrição do produto',
    });

    expect(product.id).toBeTruthy();
    expect(product.name).toBe('Nome do produto');
    expect(product.description).toBe('Descrição do produto');
  });

  it('should throw an InvalidProductError if id is not an uuid', () => {
    let error;

    try {
      new Product({
        id: 'invalid id',
        name: 'Nome do produto',
        description: 'Descrição do produto',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-product-error');
    expect(error.errorsList).toEqual(['ID do produto deve estar no padrão UUID']);
  });

  it('should throw an InvalidProductError if name is not a string', () => {
    let error;

    try {
      new Product({
        name: 123 as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-product-error');
    expect(error.errorsList).toEqual(['nome do produto deve ser uma string']);
  });

  it('should throw an InvalidProductError if name has less than 4 characters', () => {
    let error;

    try {
      new Product({
        name: '123',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-product-error');
    expect(error.errorsList).toEqual(['nome do produto deve conter pelo menos 4 caracteres']);
  });

  it('should throw an InvalidProductError if description is not a string', () => {
    let error;

    try {
      new Product({
        name: 'Nome do produto',
        description: 123 as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-product-error');
    expect(error.errorsList).toEqual(['descrição do produto deve ser uma string']);
  });

  it('should throw an InvalidProductError if description has more than 150 characters', () => {
    let error;

    try {
      new Product({
        name: 'Nome do produto',
        description: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed scelerisque orci est, quis 
            rhoncus tellus ullamcorper volutpat. 
            Duis faucibus rutrum bibendum. Maecenas vitae venenatis turpis.
          `,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-product-error');
    expect(error.errorsList).toEqual([
      'descrição do produto não deve conter mais de 150 caracteres',
    ]);
  });
});
