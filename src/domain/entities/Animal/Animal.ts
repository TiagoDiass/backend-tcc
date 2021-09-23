import InvalidAnimalError from 'domain/exceptions/InvalidAnimalError';
import { Validations } from 'lib/utils';
import { v4 as uuid } from 'uuid';
import { FieldValidationReturn } from 'domain/entities/types';

export interface IAnimalProperties {
  id?: string;
  name: string;
  type: 'dog' | 'cat';
  size: 'G' | 'M' | 'P';
  gender: 'M' | 'F';
  pictureUrl?: string;
}

export default class Animal {
  public id: string;
  public name: string;
  public type: 'dog' | 'cat';
  public size: 'G' | 'M' | 'P';
  public gender: 'M' | 'F';
  public pictureUrl: string;

  constructor({ id = uuid(), name, type, size, gender, pictureUrl = '' }: IAnimalProperties) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.size = size;
    this.gender = gender;
    this.pictureUrl = pictureUrl;

    // validations error verification
    const errors = this.validate();

    if (errors.length) {
      throw new InvalidAnimalError(errors);
    }
  }

  validate() {
    const errors: string[] = [];

    try {
      const idValidation = this.idValidation(this.id);
      errors.push(...idValidation.errors);

      const nameValidation = this.nameValidation(this.name);
      errors.push(...nameValidation.errors);

      const typeValidation = this.typeValidation(this.type);
      errors.push(...typeValidation.errors);

      const sizeValidation = this.sizeValidation(this.size);
      errors.push(...sizeValidation.errors);

      const genderValidation = this.genderValidation(this.gender);
      errors.push(...genderValidation.errors);

      const pictureUrlValidation = this.pictureUrlValidation(this.pictureUrl);
      errors.push(...pictureUrlValidation.errors);
    } catch (error: any) {
      errors.push(error.message);
    }

    return errors;
  }

  private idValidation(id: string): FieldValidationReturn {
    return {
      errors: Validations.id(id) ? [] : ['ID do animal deve estar no padrão UUID'],
    };
  }

  private nameValidation(name: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof name !== 'string') {
      errors.push('nome do animal deve ser uma string');
    } else if (name.length < 2) {
      errors.push('nome do animal deve conter pelo menos 2 caracteres');
    }

    return {
      errors,
    };
  }

  private typeValidation(type: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof type !== 'string') {
      errors.push('tipo do animal deve ser uma string');
    } else if (!['dog', 'cat'].includes(type)) {
      errors.push('tipo do animal deve ser "dog" ou "cat"');
    }

    return {
      errors,
    };
  }

  private sizeValidation(size: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof size !== 'string') {
      errors.push('porte do animal deve ser uma string');
    } else if (!['G', 'M', 'P'].includes(size)) {
      errors.push('porte do animal deve ser "G", "M", ou "P"');
    }

    return {
      errors,
    };
  }

  private genderValidation(gender: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof gender !== 'string') {
      errors.push('sexo do animal deve ser uma string');
    } else if (!['M', 'F'].includes(gender)) {
      errors.push('sexo do animal deve ser "M" ou "F"');
    }

    return {
      errors,
    };
  }

  private pictureUrlValidation(pictureUrl: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof pictureUrl !== 'string') {
      errors.push('URL da foto do animal deve ser uma string');
    } else if (pictureUrl && !Validations.url(pictureUrl)) {
      errors.push('URL da foto do animal deve ser uma URL válida');
    }

    return {
      errors,
    };
  }
}
