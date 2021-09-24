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

  it('should throw an InvalidAnimalError if size is not a string', () => {
    let error;

    try {
      new Animal({
        id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
        name: 'Twister',
        type: 'cat',
        size: 123 as unknown as IAnimalProperties['size'],
        gender: 'M',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-animal-error');
    expect(error.errorsList).toEqual(['porte do animal deve ser uma string']);
  });

  it('should throw an InvalidAnimalError if size is not "G", "M" or "P"', () => {
    let error;

    try {
      new Animal({
        id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
        name: 'Twister',
        type: 'cat',
        size: 'invalid' as IAnimalProperties['size'],
        gender: 'M',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-animal-error');
    expect(error.errorsList).toEqual(['porte do animal deve ser "G", "M" ou "P"']);
  });

  it('should throw an InvalidAnimalError if gender is not a string', () => {
    let error;

    try {
      new Animal({
        id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
        name: 'Badu',
        type: 'cat',
        size: 'G',
        gender: 123 as unknown as IAnimalProperties['gender'],
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-animal-error');
    expect(error.errorsList).toEqual(['sexo do animal deve ser uma string']);
  });

  it('should throw an InvalidAnimalError if gender is not "M" or "F"', () => {
    let error;

    try {
      new Animal({
        id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
        name: 'Twister',
        type: 'cat',
        size: 'G',
        gender: 'invalid' as IAnimalProperties['gender'],
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-animal-error');
    expect(error.errorsList).toEqual(['sexo do animal deve ser "M" ou "F"']);
  });

  it('should throw an InvalidAnimalError if pictureUrl is not a string', () => {
    let error;

    try {
      new Animal({
        name: 'Twister',
        type: 'cat',
        size: 'G',
        gender: 'F',
        pictureUrl: 123 as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-animal-error');
    expect(error.errorsList).toEqual(['URL da foto do animal deve ser uma string']);
  });

  it('should throw an InvalidAnimalError if pictureUrl is not a valid URL', () => {
    let error;

    try {
      new Animal({
        name: 'Twister',
        type: 'cat',
        size: 'G',
        gender: 'F',
        pictureUrl: 'invalid-url',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-animal-error');
    expect(error.errorsList).toEqual(['URL da foto do animal deve ser uma URL válida']);
  });

  it('should instantiate a new Animal correctly without passing a pictureUrl', () => {
    const animal = new Animal({
      id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
      name: 'Twister',
      type: 'cat',
      size: 'G',
      gender: 'F',
    });

    expect(animal).toEqual({
      id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
      name: 'Twister',
      type: 'cat',
      size: 'G',
      gender: 'F',
      pictureUrl: '',
    });
  });

  it('should instantiate a new Animal correctly passing a pictureUrl in parameters', () => {
    const animal = new Animal({
      id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
      name: 'Twister',
      type: 'cat',
      size: 'G',
      gender: 'F',
      pictureUrl: 'https://www.google.com',
    });

    expect(animal).toEqual({
      id: '25a30cf4-dc54-4470-9fd6-9c737102e73b',
      name: 'Twister',
      type: 'cat',
      size: 'G',
      gender: 'F',
      pictureUrl: 'https://www.google.com',
    });
  });
});
