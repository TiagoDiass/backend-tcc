import { FieldValidationReturn } from 'domain/entities/types';
import InvalidAddressError from 'domain/exceptions/InvalidAddressError';
import { Validations } from 'lib/utils';

export interface IAddressProperties {
  cep: string;
  street: string;
  number: number;
  complement?: string;
  district: string;
  city: string;
  state: string;
}

export default class Address {
  public cep: string;
  public street: string;
  public number: number;
  public complement: string;
  public district: string;
  public city: string;
  public state: string;

  constructor({ cep, street, number, complement = '', district, city, state }: IAddressProperties) {
    this.cep = cep;
    this.street = street;
    this.number = number;
    this.complement = complement;
    this.district = district;
    this.city = city;
    this.state = state;

    // validations error verification
    const errors = this.validate();

    if (errors.length) {
      throw new InvalidAddressError(errors);
    }
  }

  validate() {
    const errors: string[] = [];

    try {
      const cepValidation = this.cepValidation(this.cep);
      errors.push(...cepValidation.errors);

      const streetValidation = this.streetValidation(this.street);
      errors.push(...streetValidation.errors);

      const numberValidation = this.numberValidation(this.number);
      errors.push(...numberValidation.errors);

      const complementValidation = this.complementValidation(this.complement);
      errors.push(...complementValidation.errors);

      const districtValidation = this.districtValidation(this.district);
      errors.push(...districtValidation.errors);

      const cityValidation = this.cityValidation(this.city);
      errors.push(...cityValidation.errors);

      const stateValidation = this.stateValidation(this.state);
      errors.push(...stateValidation.errors);
    } catch (error: any) {
      errors.push(error.message);
    }

    return errors;
  }

  private cepValidation(cep: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof cep !== 'string') {
      errors.push('CEP do endereço deve ser uma string');
    } else if (!Validations.cep(cep)) {
      errors.push(
        'CEP do endereço informado está inválido, deve ser uma string no formato xxxxx-xxx'
      );
    }

    return {
      errors,
    };
  }

  private streetValidation(street: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof street !== 'string') {
      errors.push('Rua do endereço deve ser uma string');
    }

    return {
      errors,
    };
  }

  private numberValidation(number: number): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof number !== 'number' || number <= 0) {
      errors.push('Número do endereço deve ser do tipo number e maior que 0');
    }

    return {
      errors,
    };
  }

  private complementValidation(complement: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof complement !== 'string') {
      errors.push('Complemento do endereço deve ser uma string');
    }

    return {
      errors,
    };
  }

  private districtValidation(district: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof district !== 'string') {
      errors.push('Bairro do endereço deve ser uma string');
    }

    return {
      errors,
    };
  }

  private cityValidation(city: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof city !== 'string') {
      errors.push('Cidade do endereço deve ser uma string');
    }

    return {
      errors,
    };
  }

  private stateValidation(state: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof state !== 'string') {
      errors.push('Estado do endereço deve ser uma string');
    } else if (state.length !== 2) {
      errors.push('Cidade do endereço deve conter somente 2 caracteres');
    }

    return {
      errors,
    };
  }
}
