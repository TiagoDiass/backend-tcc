import Animal, { IAnimalProperties } from './Animal';

describe('Entity: Animal', () => {
  it('should instantiate a new Animal correctly without passing an id', () => {
    const animal = new Animal({
      name: 'Rex',
      type: 'dog',
      size: 'M',
      gender: 'M',
    });

    expect(animal.id).toBeTruthy();
    expect(animal).toMatchObject({
      name: 'Rex',
      type: 'dog',
      size: 'M',
      gender: 'M',
      pictureUrl: '',
    });
  });

  it('should instantiate a new Animal correctly passing an id in parameters', () => {
    const animal = new Animal({
      id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
      name: 'Rex',
      type: 'dog',
      size: 'M',
      gender: 'M',
    });

    expect(animal).toEqual({
      id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
      name: 'Rex',
      type: 'dog',
      size: 'M',
      gender: 'M',
      pictureUrl: '',
    });
  });

  it('should throw an InvalidAnimalError if id is not an UUID', () => {
    let error;

    try {
      new Animal({
        id: 'invalid-id',
        name: 'Rex',
        type: 'dog',
        size: 'M',
        gender: 'M',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-animal-error');
    expect(error.errorsList).toEqual(['ID do animal deve estar no padrão UUID']);
  });

  it('should throw an InvalidAnimalError if name is not a string', () => {
    let error;

    try {
      new Animal({
        id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
        name: 123 as unknown as string,
        type: 'dog',
        size: 'M',
        gender: 'M',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-animal-error');
    expect(error.errorsList).toEqual(['nome do animal deve ser uma string']);
  });

  it('should throw an InvalidAnimalError if name has less than 2 characters', () => {
    let error;

    try {
      new Animal({
        id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
        name: '1',
        type: 'dog',
        size: 'M',
        gender: 'M',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-animal-error');
    expect(error.errorsList).toEqual(['nome do animal deve conter pelo menos 2 caracteres']);
  });

  it('should throw an InvalidAnimalError if type is not a string', () => {
    let error;

    try {
      new Animal({
        id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
        name: 'Badu',
        type: 123 as unknown as IAnimalProperties['type'],
        size: 'M',
        gender: 'M',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-animal-error');
    expect(error.errorsList).toEqual(['tipo do animal deve ser uma string']);
  });

  it('should throw an InvalidAnimalError if type is not "dog" or "cat"', () => {
    let error;

    try {
      new Animal({
        id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
        name: 'Badu',
        type: 'invalid-type' as IAnimalProperties['type'],
        size: 'M',
        gender: 'M',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-animal-error');
    expect(error.errorsList).toEqual(['tipo do animal deve ser "dog" ou "cat"']);
  });

  it.todo('should throw an InvalidAnimalError if size is not a string');

  it.todo('should throw an InvalidAnimalError if size is not "G", "M" or "P"');

  it.todo('should throw an InvalidAnimalError if gender is not a string');

  it.todo('should throw an InvalidAnimalError if gender is not "M" or "F"');

  it.todo('should throw an InvalidAnimalError if pictureUrl is not a string');

  it.todo('should throw an InvalidAnimalError if pictureUrl is not a valid URL');

  it.todo('should instantiate a new Animal correctly without passing a pictureUrl');

  it.todo('should instantiate a new Animal correctly passing a pictureUrl in parameters');
});
