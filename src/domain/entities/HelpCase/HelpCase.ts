import InvalidHelpCaseError from 'domain/exceptions/InvalidHelpCaseError';
import { v4 as uuid } from 'uuid';
import { FieldValidationReturn } from 'domain/entities/types';
import { Validations } from 'lib/utils';

export type IHelpCaseProperties = {
  id?: string;
  title: string;
  description?: string;
  pictures: string[];
  poolMoneyUrl: string | null;
};

export default class HelpCase {
  public id: string;
  public title: string;
  public description: string;
  public pictures: string[];
  public poolMoneyUrl: string | null;

  constructor({
    id = uuid(),
    title,
    description = '',
    pictures = [],
    poolMoneyUrl = null,
  }: IHelpCaseProperties) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.pictures = pictures;
    this.poolMoneyUrl = poolMoneyUrl;

    const errors = this.validate();

    if (errors.length) {
      throw new InvalidHelpCaseError(errors);
    }
  }

  private validate(): string[] {
    const errors: string[] = [];

    try {
      const idValidation = this.idValidation(this.id);
      errors.push(...idValidation.errors);

      const titleValidation = this.titleValidation(this.title);
      errors.push(...titleValidation.errors);

      const descriptionValidation = this.descriptionValidation(this.description);
      errors.push(...descriptionValidation.errors);

      const picturesValidation = this.picturesValidation(this.pictures);
      errors.push(...picturesValidation.errors);

      const poolMoneyUrlValidation = this.poolMoneyUrlValidation(this.poolMoneyUrl);
      errors.push(...poolMoneyUrlValidation.errors);
    } catch (error: any) {
      errors.push(error.message);
    }

    return errors;
  }

  private idValidation(id: string): FieldValidationReturn {
    return {
      errors: Validations.id(id) ? [] : ['ID do caso de ajuda deve estar no padrão UUID'],
    };
  }

  private titleValidation(title: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof title !== 'string') {
      errors.push('título do caso de ajuda deve ser uma string');
    } else if (title.length < 5) {
      errors.push('título do caso de ajuda deve conter pelo menos 5 caracteres');
    }

    return {
      errors,
    };
  }

  private descriptionValidation(description: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof description !== 'string') {
      errors.push('descrição do caso de ajuda deve ser uma string');
    } else if (description.length > 320) {
      errors.push('descrição do caso de ajuda não deve conter mais de 320 caracteres');
    }

    return {
      errors,
    };
  }

  private picturesValidation(pictures: string[]): FieldValidationReturn {
    const errors: string[] = [];

    if (!Array.isArray(pictures)) {
      errors.push('Fotos do caso deve ser uma lista de URLs');
    } else {
      pictures.forEach((pictureURL, index) => {
        if (typeof pictureURL !== 'string') {
          errors.push(`A URL da ${index + 1}ª foto não é uma string`);
        } else if (!Validations.url(pictureURL)) {
          errors.push(`A URL da ${index + 1}ª foto está inválida`);
        }
      });
    }

    return {
      errors,
    };
  }

  private poolMoneyUrlValidation(poolMoneyUrl: string | null): FieldValidationReturn {
    const errors: string[] = [];

    if (poolMoneyUrl !== null && typeof poolMoneyUrl !== 'string') {
      errors.push('URL da vaquinha do caso deve ser uma string ou null');
    } else if (poolMoneyUrl && !Validations.url(poolMoneyUrl)) {
      errors.push('URL da vaquinha do caso deve ser uma URL válida');
    }

    return {
      errors,
    };
  }
}
