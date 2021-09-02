import Service from './Service';

describe('Entity: Service', () => {
  it('should instantiate a new Service correctly', () => {
    const service = new Service({
      title: 'Título do serviço',
    });

    expect(service.id).toBeTruthy();
    expect(service.title).toBe('Título do serviço');
    expect(service.description).toBe('');
  });

  it('should instantiate a new Service correctly passing an id in parameters', () => {
    const service = new Service({
      id: '6d21fc1a-4b2d-4102-8c24-2f3cc97680c5',
      title: 'Título do serviço',
    });

    expect(service.id).toBe('6d21fc1a-4b2d-4102-8c24-2f3cc97680c5');
    expect(service.title).toBe('Título do serviço');
    expect(service.description).toBe('');
  });

  it('should instantiate a new Service correctly passing a description in parameters', () => {
    const service = new Service({
      title: 'Título do serviço',
      description: 'Descrição do serviço',
    });

    expect(service.id).toBeTruthy();
    expect(service.title).toBe('Título do serviço');
    expect(service.description).toBe('Descrição do serviço');
  });

  it('should throw an InvalidServiceError if id is not an uuid', () => {
    let error;

    try {
      new Service({
        id: 'invalid id',
        title: 'Título do serviço',
        description: 'Descrição do serviço',
      });
    } catch (err) {
      error = err;
    }

    expect(error.type).toBe('invalid-service-error');
    expect(error.errorsList).toEqual(['ID do serviço deve estar no padrão UUID']);
  });

  it('should throw an InvalidServiceError if title has less than 5 characters', () => {
    let error;

    try {
      new Service({
        title: '1234',
        description: 'Descrição do serviço',
      });
    } catch (err) {
      error = err;
    }

    expect(error.type).toBe('invalid-service-error');
    expect(error.errorsList).toEqual(['título do serviço deve conter pelo menos 5 caracteres']);
  });

  it('should throw an InvalidServiceError if description has more than 150 characters', () => {
    let error;

    try {
      new Service({
        title: 'Título do serviço',
        description: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed scelerisque orci est, quis 
            rhoncus tellus ullamcorper volutpat. 
            Duis faucibus rutrum bibendum. Maecenas vitae venenatis turpis.
          `,
      });
    } catch (err) {
      error = err;
    }

    expect(error.type).toBe('invalid-service-error');
    expect(error.errorsList).toEqual([
      'descrição do serviço não deve conter mais de 150 caracteres',
    ]);
  });
});
