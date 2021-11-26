import HelpCase from 'domain/entities/HelpCase/HelpCase';
import IHelpCaseRepository from 'domain/ports/HelpCaseRepository';
import {
  IRequestCreateHelpCaseDTO,
  IRequestDeleteHelpCaseDTO,
  IRequestUpdateHelpCaseDTO,
  IRequestGetHelpCaseByIdDTO,
} from 'domain/services/dto';
import faker from 'faker';

export const mockHelpCaseRepository = (): IHelpCaseRepository => ({
  list: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

export const mockHelpCase = (): HelpCase =>
  new HelpCase({
    title: faker.random.words(2),
    description: faker.random.words(7),
    pictures: [
      faker.image.imageUrl(undefined, undefined, 'animals', false, true),
      faker.image.imageUrl(undefined, undefined, 'animals', false, true),
    ],
    poolMoneyUrl: faker.internet.url(),
  });

export const mockCreateHelpCaseDTO = (): IRequestCreateHelpCaseDTO => ({
  title: faker.random.words(2),
  description: faker.random.words(7),
  pictures: [
    faker.image.imageUrl(undefined, undefined, 'animals', false, true),
    faker.image.imageUrl(undefined, undefined, 'animals', false, true),
  ],
  poolMoneyUrl: faker.internet.url(),
});

export const mockDeleteHelpCaseDTO = (): IRequestDeleteHelpCaseDTO => ({
  id: faker.datatype.uuid(),
});

export const mockGetHelpCaseByIdDTO = (): IRequestGetHelpCaseByIdDTO => ({
  id: faker.datatype.uuid(),
});

export const mockUpdateHelpCaseDTO = (): IRequestUpdateHelpCaseDTO => ({
  id: faker.datatype.uuid(),
  title: faker.random.words(2),
  description: faker.random.words(7),
  pictures: [
    faker.image.imageUrl(undefined, undefined, 'animals', false, true),
    faker.image.imageUrl(undefined, undefined, 'animals', false, true),
  ],
  poolMoneyUrl: faker.internet.url(),
});
