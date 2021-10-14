import InvalidMedicineError from 'domain/exceptions/InvalidMedicineError';
import { Validations } from 'lib/utils';
import { v4 as uuid } from 'uuid';
import { FieldValidationReturn } from 'domain/entities/types';

export interface IMedicineProperties {
  id?: string;
  name: string;
  description?: string;
  expirationDate: string;
  amount: {
    unit: 'mls' | 'mgs' | 'pill amount';
    value: number;
  };
}

export default class Medicine {
  public id: string;
  public name: string;
  public description: string;
  public expirationDate: string;
  public amount: IMedicineProperties['amount'];

  constructor({
    id = uuid(),
    name,
    description = '',
    expirationDate,
    amount,
  }: IMedicineProperties) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.expirationDate = expirationDate;
    this.amount = amount;

    // validations error verification
    const errors = this.validate();

    if (errors.length) {
      throw new InvalidMedicineError(errors);
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

      const expirationDateValidation = this.expirationDateValidation(this.expirationDate);
      errors.push(...expirationDateValidation.errors);

      const amountValidation = this.amountValidation(this.amount);
      errors.push(...amountValidation.errors);
    } catch (error: any) {
      errors.push(error.message);
    }

    return errors;
  }

  private idValidation(id: string): FieldValidationReturn {
    return {
      errors: Validations.id(id) ? [] : ['ID do medicamento deve estar no padrão UUID'],
    };
  }

  private nameValidation(name: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof name !== 'string') {
      errors.push('nome do medicamento deve ser uma string');
    } else if (name.length < 4) {
      errors.push('nome do medicamento deve conter pelo menos 4 caracteres');
    }

    return {
      errors,
    };
  }

  private descriptionValidation(description: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof description !== 'string') {
      errors.push('descrição do medicamento deve ser uma string');
    } else if (description.length > 150) {
      errors.push('descrição do medicamento não deve conter mais de 150 caracteres');
    }

    return {
      errors,
    };
  }

  private expirationDateValidation(expirationDate: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof expirationDate !== 'string') {
      errors.push('data de validade do medicamento deve ser uma string');
    } else if (!Validations.date_YYYY_MM_DD(expirationDate)) {
      errors.push('data de validade do medicamento deve estar no formato yyyy-mm-dd');
    }

    return {
      errors,
    };
  }

  private amountValidation(amount: IMedicineProperties['amount']): FieldValidationReturn {
    const errors: string[] = [];

    if (!amount || typeof amount.unit !== 'string' || typeof amount.value !== 'number') {
      errors.push(
        'quantidade do medicamento deve ser um objeto no formato { unit: string, value: number }'
      );
    } else if (!['mls', 'mgs', 'pill amount'].includes(amount.unit)) {
      errors.push('unidade do medicament deve ser "mls", "mgs" ou "pill amount"');
    }

    return {
      errors,
    };
  }
}
