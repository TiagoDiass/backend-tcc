import { Address } from 'domain/valueObjects';
import PartnerClinic from './PartnerClinic';

const validPartnerClinic = {
  name: 'PetsCare',
  cnpj: '70008876000160',
  email: 'contato@petscare.com.br',
  phone: '19912341234',
  address: new Address({
    cep: '13802-310',
    street: 'Rua Moizéz Bento Moretto',
    number: 260,
    district: 'Parque das Laranjeiras',
    city: 'Mogi Mirim',
    state: 'SP',
  }),
} as const;

describe('Entity: PartnerClinic', () => {
  it('should instantiate a new PartnerClinic correctly', () => {
    const partnerClinic = new PartnerClinic(validPartnerClinic);

    expect(partnerClinic.id).toBeTruthy();
    expect(partnerClinic).toMatchObject({
      name: 'PetsCare',
      cnpj: '70008876000160',
      email: 'contato@petscare.com.br',
      phone: '19912341234',
      address: {
        cep: '13802-310',
        street: 'Rua Moizéz Bento Moretto',
        number: 260,
        district: 'Parque das Laranjeiras',
        city: 'Mogi Mirim',
        state: 'SP',
      },
    });
  });

  it('should throw an InvalidPartnerClinicError if id is not an UUID', () => {
    let error;

    try {
      new PartnerClinic({
        ...validPartnerClinic,
        id: 'invalid-id',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-partner-clinic-error');
    expect(error.errorsList).toEqual(['ID da clínica deve estar no padrão UUID']);
  });

  it('should throw an InvalidPartnerClinicError if name is not a string', () => {
    let error;

    try {
      new PartnerClinic({
        ...validPartnerClinic,
        name: undefined as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-partner-clinic-error');
    expect(error.errorsList).toEqual(['nome da clínica deve ser uma string']);
  });

  it('should throw an InvalidPartnerClinicError if name has less than 4 characters', () => {
    let error;

    try {
      new PartnerClinic({
        ...validPartnerClinic,
        name: '1',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-partner-clinic-error');
    expect(error.errorsList).toEqual(['nome da clínica deve conter pelo menos 4 caracteres']);
  });

  it('should throw an InvalidPartnerClinicError if email is not a string', () => {
    let error;

    try {
      new PartnerClinic({
        ...validPartnerClinic,
        email: undefined as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-partner-clinic-error');
    expect(error.errorsList).toEqual(['e-mail da clínica deve ser uma string']);
  });

  it('should throw an InvalidPartnerClinicError if email is not valid', () => {
    let error;

    try {
      new PartnerClinic({
        ...validPartnerClinic,
        email: 'invalid-email',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-partner-clinic-error');
    expect(error.errorsList).toEqual(['e-mail da clínica está inválido']);
  });

  it('should throw an InvalidPartnerClinicError if cnpj is not a string', () => {
    let error;

    try {
      new PartnerClinic({
        ...validPartnerClinic,
        cnpj: undefined as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-partner-clinic-error');
    expect(error.errorsList).toEqual(['CNPJ da clínica deve ser uma string']);
  });

  it('should throw an InvalidPartnerClinicError if cnpj is not valid', () => {
    let error;

    try {
      new PartnerClinic({
        ...validPartnerClinic,
        cnpj: 'invalid-cnpj',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-partner-clinic-error');
    expect(error.errorsList).toEqual(['CNPJ da clínica está inválido']);
  });

  it('should throw an InvalidPartnerClinicError if phone is not a string', () => {
    let error;

    try {
      new PartnerClinic({
        ...validPartnerClinic,
        phone: undefined as unknown as string,
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-partner-clinic-error');
    expect(error.errorsList).toEqual(['telefone da clínica deve ser uma string']);
  });

  it('should throw an InvalidPartnerClinicError if phone is not valid', () => {
    let error;

    try {
      new PartnerClinic({
        ...validPartnerClinic,
        phone: 'invalid-phone',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.type).toBe('invalid-partner-clinic-error');
    expect(error.errorsList).toEqual(['telefone da clínica está inválido']);
  });
});
