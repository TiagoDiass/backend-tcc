import InvalidProductError from 'domain/exceptions/InvalidProductError';
import { Validations } from 'lib/utils';
import { v4 as uuid } from 'uuid';
import { FieldValidationReturn } from 'domain/entities/types';

export interface IProductProperties {
  id?: string;
  name: string;
  description?: string;
}

export default class Product {
  public id: string;
  public name: string;
  public description: string;

  constructor({ id = uuid(), name, description = '' }: IProductProperties) {
    this.id = id;
    this.name = name;
    this.description = description;

    // validations error verification
    const errors = this.validate();

    if (errors.length) {
      throw new InvalidProductError(errors);
    }
  }

  private validate() {
    const errors: string[] = [];

    try {
      const idValidation = this.idValidation(this.id);
      errors.push(...idValidation.errors);

      const nameValidation = this.nameValidation(this.name);
      errors.push(...nameValidation.errors);

      const descriptionValidation = this.descriptionValidation(this.description);
      errors.push(...descriptionValidation.errors);
    } catch (error: any) {
      errors.push(error.message);
    }

    return errors;
  }

  private idValidation(id: string): FieldValidationReturn {
    return {
      errors: Validations.id(id) ? [] : ['ID do produto deve estar no padrão UUID'],
    };
  }

  private nameValidation(name: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof name !== 'string') {
      errors.push('nome do produto deve ser uma string');
    } else if (name.length < 4) {
      errors.push('nome do produto deve conter pelo menos 4 caracteres');
    }

    return {
      errors,
    };
  }

  private descriptionValidation(description: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof description !== 'string') {
      errors.push('descrição do produto deve ser uma string');
    } else if (description.length > 150) {
      errors.push('descrição do produto não deve conter mais de 150 caracteres');
    }

    return {
      errors,
    };
  }
}
