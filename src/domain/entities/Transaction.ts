import InvalidTransactionError from 'domain/exceptions/InvalidTransactionError';
import { v4 as uuid } from 'uuid';

export interface ITransactionProperties {
  id?: string;
  title: string;
  value: number;
  type: 'deposit' | 'withdraw';
  date: string;
}

export default class Transaction {
  public id: string;
  public title: string;
  public value: number;
  public type: 'deposit' | 'withdraw';
  public date: string;

  constructor({
    id = uuid(),
    title,
    value,
    type,
    date,
  }: ITransactionProperties) {
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
    let errors: string[] = [];

    try {
      const titleValidation = this.titleValidation(this.title);
      errors.push(...titleValidation.errors);

      const valueValidation = this.valueValidation(this.value);
      errors.push(...valueValidation.errors);

      const typeValidation = this.typeValidation(this.type);
      errors.push(...typeValidation.errors);
    } catch (error) {
      console.log(error);
      errors.push(error.message);
    }

    return errors;
  }

  private titleValidation(title: string) {
    let errors: string[] = [];

    if (typeof title !== 'string') {
      errors.push('título da transação deve ser uma string');
    } else if (title.length < 5) {
      errors.push('título da transação deve conter pelo menos 5 caracteres');
    }

    return {
      errors,
    };
  }

  private valueValidation(value: number) {
    return {
      errors: value <= 0 ? ['valor da transação deve ser maior que zero'] : [],
    };
  }

  private typeValidation(type: string) {
    let errors: string[] = [];

    if (typeof type !== 'string') {
      errors.push('tipo da transação deve ser uma string');
    } else if (!['deposit', 'withdraw'].includes(type)) {
      errors.push('tipo da transação deve ser "deposit" ou "withdraw"');
    }

    return {
      errors,
    };
  }
}
