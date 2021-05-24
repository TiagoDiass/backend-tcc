import Service from 'domain/entities/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';
import {
  IRequestCreateServiceDTO,
  IRequestDeleteServiceDTO,
  IRequestEditServiceDTO,
  IRequestGetServiceByIdDTO,
} from 'domain/services/dto';
import faker from 'faker';

export const mockServiceRepository = (): IServiceRepository => ({
  list: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

export const mockService = (): Service =>
  new Service({
    title: faker.random.words(2),
    description: faker.random.words(7),
  });

export const mockCreateServiceDTO = (): IRequestCreateServiceDTO => ({
  title: faker.random.words(2),
  description: faker.random.words(7),
});

export const mockDeleteServiceDTO = (): IRequestDeleteServiceDTO => ({
  id: faker.datatype.uuid(),
});

export const mockGetServiceByIdDTO = (): IRequestGetServiceByIdDTO => ({
  id: faker.datatype.uuid(),
});

export const mockEditServiceDTO = (): IRequestEditServiceDTO => ({
  id: faker.datatype.uuid(),
  title: faker.random.words(2),
  description: faker.random.words(7),
});
