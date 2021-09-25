import CreateAnimal from './CreateAnimal';
import { IRequestCreateAnimalDTO } from 'domain/services/dto';
import { mockAnimalRepository, mockCreateAnimalDTO } from '@testUtils/animalsMocks';
import IAnimalRepository from 'domain/ports/AnimalRepository';

const UUID_MOCK = '1e16f407-1cef-427c-af39-e9c3efcbd18e';

jest.mock('uuid', () => ({
  v4: jest.fn().mockImplementation(() => UUID_MOCK),
}));

describe('Service: CreateAnimal', () => {
  it('should call animalRepository.save() and return correctly', async () => {
    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),

      save: jest.fn().mockImplementationOnce(animal => ({
        data: animal,
      })),
    };

    const createAnimal = new CreateAnimal(animalRepositoryMock);

    const createAnimalDTO: IRequestCreateAnimalDTO = {
      name: 'Ravenna',
      gender: 'F',
      size: 'G',
      type: 'dog',
    };

    const response = await createAnimal.execute(createAnimalDTO);

    expect(animalRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(animalRepositoryMock.save).toHaveBeenCalledWith({
      id: UUID_MOCK,
      pictureUrl: '',
      ...createAnimalDTO,
    });

    expect(response).toEqual({
      status: 201,
      result: {
        id: UUID_MOCK,
        pictureUrl: '',
        ...createAnimalDTO,
      },
    });
  });

  it('should return correctly if Animal entity throws an exception', async () => {
    const animalRepositoryMock = mockAnimalRepository();

    const createAnimal = new CreateAnimal(animalRepositoryMock);

    const createAnimalDTO: IRequestCreateAnimalDTO = {
      ...mockCreateAnimalDTO(),
      pictureUrl: 'invalid-url', // invalid url, so Animal entity will throw an exception
    };

    const response = await createAnimal.execute(createAnimalDTO);

    expect(animalRepositoryMock.save).not.toHaveBeenCalled();

    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Animal inválido',
        errorsList: ['URL da foto do animal deve ser uma URL válida'],
      },
    });
  });

  it('should return correctly if AnimalRepository throws an exception', async () => {
    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),

      save: jest.fn().mockImplementationOnce(() => {
        throw new Error('Erro mockado');
      }),
    };

    const createAnimal = new CreateAnimal(animalRepositoryMock);

    const response = await createAnimal.execute(mockCreateAnimalDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
