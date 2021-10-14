import Medicine, { IMedicineProperties } from './Medicine';

describe('Entity: Medicine', () => {
  it('should instantiate a new Medicine correctly without passing an id in parameters', () => {
    const medicine = new Medicine({
      name: 'Nome do medicamento',
      expirationDate: '2023-10-13',
      amount: {
        unit: 'mgs',
        value: 2,
      },
    });

    expect(medicine.id).toBeTruthy();
    expect(medicine.name).toBe('Nome do medicamento');
    expect(medicine.description).toBe('');
    expect(medicine.expirationDate).toBe('2023-10-13');
    expect(medicine.amount).toEqual({
      unit: 'mgs',
      value: 2,
    });
  });

  it('should instantiate a new Medicine correctly passing an id in parameters', () => {
    const medicine = new Medicine({
      id: '6d21fc1a-4b2d-4102-8c24-2f3cc97680c5',
      name: 'Nome do medicamento',
      expirationDate: '2023-10-13',
      amount: {
        unit: 'mgs',
        value: 2,
      },
    });

    expect(medicine).toEqual({
      id: '6d21fc1a-4b2d-4102-8c24-2f3cc97680c5',
      name: 'Nome do medicamento',
      description: '',
      expirationDate: '2023-10-13',
      amount: {
        unit: 'mgs',
        value: 2,
      },
    });
  });

  it('should instantiate a new Medicine correctly passing a description in parameters', () => {
    const medicine = new Medicine({
      id: '6d21fc1a-4b2d-4102-8c24-2f3cc97680c5',
      name: 'Nome do medicamento',
      description: 'descrição do medicamento',
      expirationDate: '2023-10-13',
      amount: {
        unit: 'mgs',
        value: 2,
      },
    });

    expect(medicine).toEqual({
      id: '6d21fc1a-4b2d-4102-8c24-2f3cc97680c5',
      name: 'Nome do medicamento',
      description: 'descrição do medicamento',
      expirationDate: '2023-10-13',
      amount: {
        unit: 'mgs',
        value: 2,
      },
    });
  });

  it('should throw an InvalidMedicineError if id is not an uuid', () => {
    try {
      new Medicine({
        id: 'invalid-id',
        name: 'Nome do medicamento',
        expirationDate: '2023-10-13',
        amount: {
          unit: 'mgs',
          value: 2,
        },
      });
    } catch (error: any) {
      expect(error.type).toBe('invalid-medicine-error');
      expect(error.errorsList).toEqual(['ID do medicamento deve estar no padrão UUID']);
    }
  });

  it('should throw an InvalidMedicineError if name is not a string', () => {
    try {
      new Medicine({
        name: 123 as unknown as string,
        expirationDate: '2023-10-13',
        amount: {
          unit: 'mgs',
          value: 2,
        },
      });
    } catch (error: any) {
      expect(error.type).toBe('invalid-medicine-error');
      expect(error.errorsList).toEqual(['nome do medicamento deve ser uma string']);
    }
  });

  it('should throw an InvalidMedicineError if name has less than 4 characters', () => {
    try {
      new Medicine({
        name: '123', // invalid name
        expirationDate: '2023-10-13',
        amount: {
          unit: 'mgs',
          value: 2,
        },
      });
    } catch (error: any) {
      expect(error.type).toBe('invalid-medicine-error');
      expect(error.errorsList).toEqual(['nome do medicamento deve conter pelo menos 4 caracteres']);
    }
  });

  it('should throw an InvalidMedicineError if description is not a string', () => {
    try {
      new Medicine({
        name: 'Nome do medicamento',
        description: 123 as unknown as string,
        expirationDate: '2023-10-13',
        amount: {
          unit: 'mgs',
          value: 2,
        },
      });
    } catch (error: any) {
      expect(error.type).toBe('invalid-medicine-error');
      expect(error.errorsList).toEqual(['descrição do medicamento deve ser uma string']);
    }
  });

  it('should throw an InvalidMedicineError if expirationDate is not a string', () => {
    try {
      new Medicine({
        name: 'Nome do medicamento',
        expirationDate: 123 as unknown as string,
        amount: {
          unit: 'mgs',
          value: 2,
        },
      });
    } catch (error: any) {
      expect(error.type).toBe('invalid-medicine-error');
      expect(error.errorsList).toEqual(['data de validade do medicamento deve ser uma string']);
    }
  });

  it('should throw an InvalidMedicineError if expirationDate is not in the correct format', () => {
    try {
      new Medicine({
        name: 'Nome do medicamento',
        expirationDate: 'invalid-date',
        amount: {
          unit: 'mgs',
          value: 2,
        },
      });
    } catch (error: any) {
      expect(error.type).toBe('invalid-medicine-error');
      expect(error.errorsList).toEqual([
        'data de validade do medicamento deve estar no formato yyyy-mm-dd',
      ]);
    }
  });

  it('should throw an InvalidMedicineError if amount is not a valid object', () => {
    try {
      new Medicine({
        name: 'Nome do medicamento',
        expirationDate: '2023-10-13',
        amount: null as unknown as IMedicineProperties['amount'],
      });
    } catch (error: any) {
      expect(error.type).toBe('invalid-medicine-error');
      expect(error.errorsList).toEqual([
        'quantidade do medicamento deve ser um objeto no formato { unit: string, value: number }',
      ]);
    }
  });

  it('should throw an InvalidMedicineError if amount.unit is not one of the correct options', () => {
    try {
      new Medicine({
        name: 'Nome do medicamento',
        expirationDate: '2023-10-13',
        amount: {
          unit: 'invalid-unit' as IMedicineProperties['amount']['unit'],
          value: 3,
        },
      });
    } catch (error: any) {
      expect(error.type).toBe('invalid-medicine-error');
      expect(error.errorsList).toEqual([
        'unidade do medicament deve ser "mls", "mgs" ou "pill amount"',
      ]);
    }
  });
});
