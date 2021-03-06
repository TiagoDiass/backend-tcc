import Medicine from 'domain/entities/Medicine/Medicine';
import IMedicineRepository from 'domain/ports/MedicineRepository';
import {
  IRequestCreateMedicineDTO,
  IRequestDeleteMedicineDTO,
  IRequestGetMedicineByIdDTO,
  IRequestUpdateMedicineDTO,
} from 'domain/services/dto';
import faker from 'faker';

export const mockMedicineRepository = (): IMedicineRepository => ({
  list: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
});

export const mockMedicine = (): Medicine =>
  new Medicine({
    name: faker.random.words(2),
    description: faker.random.words(5),
    expirationDate: faker.date.recent().toISOString().split('T')[0],
    amount: {
      value: faker.datatype.number(),
      unit: faker.random.arrayElement(['mls', 'mgs', 'pill amount']),
    },
  });

export const mockCreateMedicineDTO = (): IRequestCreateMedicineDTO => ({
  name: faker.random.words(2),
  description: faker.random.words(5),
  expirationDate: faker.date.recent().toISOString().split('T')[0],
  amount: {
    value: faker.datatype.number(),
    unit: faker.random.arrayElement(['mls', 'mgs', 'pill amount']),
  },
});

export const mockGetMedicineByIdDTO = (): IRequestGetMedicineByIdDTO => ({
  id: faker.datatype.uuid(),
});

export const mockDeleteMedicineDTO = (): IRequestDeleteMedicineDTO => ({
  id: faker.datatype.uuid(),
});

export const mockUpdateMedicineDTO = (): IRequestUpdateMedicineDTO => ({
  id: faker.datatype.uuid(),
  name: faker.random.words(2),
  description: faker.random.words(5),
  expirationDate: faker.date.recent().toISOString().split('T')[0],
  amount: {
    value: faker.datatype.number(),
    unit: faker.random.arrayElement(['mls', 'mgs', 'pill amount']),
  },
});
