import InvalidServiceError from 'domain/exceptions/InvalidServiceError';
import { Validations } from 'lib/utils';
import { v4 as uuid } from 'uuid';

export interface IServiceProperties {
  id?: string;
  title: string;
  description?: string;
}

type FieldValidationReturn = {
  errors: string[];
};

export default class Service {
  public id: string;
  public title: string;
  public description: string;

  constructor({ id = uuid(), title, description = '' }: IServiceProperties) {
    this.id = id;
    this.title = title;
    this.description = description;

    // validations error verification
    const errors = this.validate();

    if (errors.length) {
      throw new InvalidServiceError(errors);
    }
  }

  private validate() {
    const errors: string[] = [];

    try {
      const idValidation = this.idValidation(this.id);
      errors.push(...idValidation.errors);

      const titleValidation = this.titleValidation(this.title);
      errors.push(...titleValidation.errors);

      const descriptionValidation = this.descriptionValidation(
        this.description
      );
      errors.push(...descriptionValidation.errors);
    } catch (error) {
      errors.push(error.message);
    }

    return errors;
  }

  private idValidation(id: string): FieldValidationReturn {
    return {
      errors: Validations.id(id)
        ? []
        : ['ID do serviço deve estar no padrão UUID'],
    };
  }

  private titleValidation(title: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof title !== 'string') {
      errors.push('título do serviço deve ser uma string');
    } else if (title.length < 5) {
      errors.push('título do serviço deve conter pelo menos 5 caracteres');
    }

    return {
      errors,
    };
  }

  private descriptionValidation(description: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof description !== 'string') {
      errors.push('descrição do serviço deve ser uma string');
    } else if (description.length > 150) {
      errors.push(
        'descrição do serviço não deve conter mais de 150 caracteres'
      );
    }

    return {
      errors,
    };
  }
}
