import faker from 'faker';
import HelpCase from './HelpCase';

const validHelpCase = {
  title: 'Título do caso',
  description: 'Descrição do caso',
  pictures: [
    'https://source.unsplash.com/1400x900/?dog',
    'https://source.unsplash.com/1400x900/?kitty',
  ] as string[],
  poolMoneyUrl: null,
} as const;

describe('Entity: HelpCase', () => {
  it('should instantiate a new HelpCase correctly', () => {
    const helpCase = new HelpCase({
      ...validHelpCase,
    });

    expect(helpCase.id).toBeTruthy();
    expect(helpCase).toMatchObject({
      ...validHelpCase,
    });
  });

  it('should throw an InvalidHelpCaseError if id is not an UUID', () => {
    let error;

    try {
      new HelpCase({
        ...validHelpCase,
        id: 'invalid-id',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-help-case-error');
    expect(error.errorsList).toEqual(['ID do caso de ajuda deve estar no padrão UUID']);
  });

  it('should throw an InvalidHelpCaseError if title is not a string', () => {
    let error;

    try {
      new HelpCase({
        ...validHelpCase,
        title: 123 as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-help-case-error');
    expect(error.errorsList).toEqual(['título do caso de ajuda deve ser uma string']);
  });

  it('should throw an InvalidHelpCaseError if title has less than 5 characters', () => {
    let error;

    try {
      new HelpCase({
        ...validHelpCase,
        title: '123',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-help-case-error');
    expect(error.errorsList).toEqual([
      'título do caso de ajuda deve conter pelo menos 5 caracteres',
    ]);
  });

  it('should throw an InvalidHelpCaseError if description is not a string', () => {
    let error;

    try {
      new HelpCase({
        ...validHelpCase,
        description: 123 as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-help-case-error');
    expect(error.errorsList).toEqual(['descrição do caso de ajuda deve ser uma string']);
  });

  it('should throw an InvalidHelpCaseError if description has more than 320 characters', () => {
    let error;

    try {
      new HelpCase({
        ...validHelpCase,
        description: faker.lorem.words(330),
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-help-case-error');
    expect(error.errorsList).toEqual([
      'descrição do caso de ajuda não deve conter mais de 320 caracteres',
    ]);
  });

  it.todo('should throw an InvalidHelpCaseError if pictures is not an array');

  it.todo('should throw an InvalidHelpCaseError if some picture is not a string');

  it.todo('should throw an InvalidHelpCaseError if some picture is not a valid url');

  it.todo('should throw an InvalidHelpCaseError if poolMoneyUrl is not a null or a string');

  it.todo('should throw an InvalidHelpCaseError if poolMoneyUrl is not a valid url');
});
