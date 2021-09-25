import Animal from 'domain/entities/Animal/Animal';
import IAnimalRepository from 'domain/ports/AnimalRepository';
import {
  IRequestCreateAnimalDTO,
  IRequestGetAnimalByIdDTO,
  IRequestDeleteAnimalDTO,
  IRequestUpdateAnimalDTO,
} from 'domain/services/dto';
import faker from 'faker';

export const mockAnimalRepository = (): IAnimalRepository => ({
  list: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

export const mockAnimal = (): Animal =>
  new Animal({
    name: faker.random.word(),
    gender: faker.random.arrayElement(['M', 'F']),
    type: faker.random.arrayElement(['dog', 'cat']),
    size: faker.random.arrayElement(['G', 'M', 'P']),
    pictureUrl: faker.image.imageUrl(undefined, undefined, 'animals', false, true),
  });

export const mockCreateAnimalDTO = (): IRequestCreateAnimalDTO => ({
  name: faker.random.word(),
  gender: faker.random.arrayElement(['M', 'F']),
  type: faker.random.arrayElement(['dog', 'cat']),
  size: faker.random.arrayElement(['G', 'M', 'P']),
  pictureUrl: faker.image.imageUrl(undefined, undefined, 'animals', false, true),
});

export const mockDeleteAnimalDTO = (): IRequestDeleteAnimalDTO => ({
  id: faker.datatype.uuid(),
});

export const mockGetAnimalByIdDTO = (): IRequestGetAnimalByIdDTO => ({
  id: faker.datatype.uuid(),
});
