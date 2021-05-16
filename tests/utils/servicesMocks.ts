import Service from 'domain/entities/Service';
import IServiceRepository from 'domain/ports/ServiceRepository';
import faker from 'faker';

export const mockServiceRepository = (): IServiceRepository => ({
  list: jest.fn(),
  save: jest.fn(),
});

export const mockService = (): Service =>
  new Service({
    title: faker.random.words(2),
    description: faker.random.words(10),
  });
