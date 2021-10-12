import InvalidTransactionError from 'domain/exceptions/InvalidTransactionError';
import { Validations } from 'lib/utils';
import { v4 as uuid } from 'uuid';
import { FieldValidationReturn } from '../types';

export interface ITransactionProperties {
  id?: string;
  title: string;
  value: number;
  type: 'deposit' | 'withdraw';
  date: string;
}

/**
 * @class Transaction
 * @param {string} id - ID da transação
 * @param {string} title - título da transação
 * @param {number} value - valor da transação (em centavos, para facilitar o tratamento e cálculos)
 * @param {'deposit' | 'withdraw'} type - tipo da transação
 * @param {string} date - data da transação no formato YYYY-MM-DD
 */
export default class Transaction {
  public id: string;
  public title: string;
  public value: number;
  public type: 'deposit' | 'withdraw';
  public date: string;

  constructor({ id = uuid(), title, value, type, date }: ITransactionProperties) {
    this.id = id;
    this.title = title;
    this.value = value;
    this.type = type;
    this.date = date;

    // validations error verification
    const errors = this.validate();

    if (errors.length) {
      throw new InvalidTransactionError(errors);
    }
  }

  private validate() {
    const errors: string[] = [];

    try {
      const idValidation = this.idValidation(this.id);
      errors.push(...idValidation.errors);

      const titleValidation = this.titleValidation(this.title);
      errors.push(...titleValidation.errors);

      const valueValidation = this.valueValidation(this.value);
      errors.push(...valueValidation.errors);

      const typeValidation = this.typeValidation(this.type);
      errors.push(...typeValidation.errors);

      const dateValidation = this.dateValidation(this.date);
      errors.push(...dateValidation.errors);
    } catch (error: any) {
      errors.push(error.message);
    }

    return errors;
  }

  private idValidation(id: string): FieldValidationReturn {
    return {
      errors: Validations.id(id) ? [] : ['ID da transação deve estar no padrão UUID V4'],
    };
  }

  private titleValidation(title: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof title !== 'string') {
      errors.push('título da transação deve ser uma string');
    } else if (title.length < 5) {
      errors.push('título da transação deve conter pelo menos 5 caracteres');
    }

    return {
      errors,
    };
  }

  private valueValidation(value: number): FieldValidationReturn {
    if (typeof value !== 'number') {
      return {
        errors: ['valor da transação deve ser um número'],
      };
    }

    return {
      errors: value <= 0 ? ['valor da transação deve ser maior que zero'] : [],
    };
  }

  private typeValidation(type: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof type !== 'string') {
      errors.push('tipo da transação deve ser uma string');
    } else if (!['deposit', 'withdraw'].includes(type)) {
      errors.push('tipo da transação deve ser "deposit" ou "withdraw"');
    }

    return {
      errors,
    };
  }

  private dateValidation(date: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof date !== 'string') {
      errors.push('data da transação deve ser uma string');
    } else if (!Validations.date_YYYY_MM_DD(date)) {
      errors.push('data da transação deve estar no formato yyyy-mm-dd');
    }

    return {
      errors,
    };
  }
}
