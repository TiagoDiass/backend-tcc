import InvalidPartnerClinicError from 'domain/exceptions/InvalidPartnerClinicError';
import { Address } from 'domain/valueObjects';
import { Validations } from 'lib/utils';
import { v4 as uuid } from 'uuid';
import { FieldValidationReturn } from '../types';

export interface IPartnerClinicProperties {
  id?: string;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: Address;
}

export default class PartnerClinic {
  public id: string;
  public name: string;
  public email: string;
  public phone: string;
  public cnpj: string;
  public address: Address;

  constructor({ id = uuid(), name, email, phone, cnpj, address }: IPartnerClinicProperties) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.cnpj = cnpj;
    this.address = address;

    // validations error verification
    const errors = this.validate();

    if (errors.length) {
      throw new InvalidPartnerClinicError(errors);
    }
  }

  private validate() {
    const errors: string[] = [];

    try {
      const idValidation = this.idValidation(this.id);
      errors.push(...idValidation.errors);

      const nameValidation = this.nameValidation(this.name);
      errors.push(...nameValidation.errors);

      const emailValidation = this.emailValidation(this.email);
      errors.push(...emailValidation.errors);

      const phoneValidation = this.phoneValidation(this.phone);
      errors.push(...phoneValidation.errors);

      const cnpjValidation = this.cnpjValidation(this.cnpj);
      errors.push(...cnpjValidation.errors);
    } catch (error: any) {
      errors.push(error.message);
    }

    return errors;
  }

  private idValidation(id: string): FieldValidationReturn {
    return {
      errors: Validations.id(id) ? [] : ['ID da clínica deve estar no padrão UUID'],
    };
  }

  private nameValidation(name: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof name !== 'string') {
      errors.push('nome da clínica deve ser uma string');
    } else if (name.length < 4) {
      errors.push('nome da clínica deve conter pelo menos 4 caracteres');
    }

    return {
      errors,
    };
  }

  private emailValidation(email: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof email !== 'string') {
      errors.push('e-mail da clínica deve ser uma string');
    } else if (!Validations.email(email)) {
      errors.push('e-mail da clínica está inválido');
    }

    return {
      errors,
    };
  }

  private cnpjValidation(cnpj: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof cnpj !== 'string') {
      errors.push('CNPJ da clínica deve ser uma string');
    } else if (!Validations.cnpj(cnpj)) {
      errors.push('CNPJ da clínica está inválido');
    }

    return {
      errors,
    };
  }

  private phoneValidation(phone: string): FieldValidationReturn {
    const errors: string[] = [];

    if (typeof phone !== 'string') {
      errors.push('telefone da clínica deve ser uma string');
    } else if (!Validations.phone(phone)) {
      errors.push('telefone da clínica está inválido');
    }

    return {
      errors,
    };
  }
}
