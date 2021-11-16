import PartnerClinic from 'domain/entities/PartnerClinic/PartnerClinic';
import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';
import { Address } from 'domain/valueObjects';
import faker from 'faker/locale/pt_BR';
import { BRAZILIAN_STATES } from './constants/brazilianStates';

export const mockPartnerClinicRepository = (): IPartnerClinicRepository => ({
  list: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

export const mockPartnerClinic = (): PartnerClinic =>
  new PartnerClinic({
    name: faker.random.words(2),
    cnpj: '26186630000196', // faker cannot generate random cnpj
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber('###########'),
    address: new Address({
      cep: faker.address.zipCode('#####-###'),
      street: faker.address.streetName(),
      number: faker.datatype.number(),
      district: faker.address.city(),
      city: faker.address.city(),
      state: faker.random.arrayElement(BRAZILIAN_STATES),
    }),
  });
