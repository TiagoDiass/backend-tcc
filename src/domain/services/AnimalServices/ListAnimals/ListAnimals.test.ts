import ListAnimals from './ListAnimals';
import { mockAnimal, mockAnimalRepository } from '@testUtils/animalsMocks';
import IAnimalRepository from 'domain/ports/AnimalRepository';

describe('Service: ListAnimals', () => {
  it('should call animalRepository.list() and return correctly', async () => {
    const animalsToBeReturned = [mockAnimal(), mockAnimal()];

    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),

      list: jest.fn().mockResolvedValue({
        data: animalsToBeReturned,
      }),
    };

    const listAnimals = new ListAnimals(animalRepositoryMock);

    const response = await listAnimals.execute();

    expect(animalRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 200,
      result: animalsToBeReturned,
    });
  });

  it('should return correctly if AnimalRepository throws an exception', async () => {
    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),

      list: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const listAnimals = new ListAnimals(animalRepositoryMock);

    const response = await listAnimals.execute();

    expect(animalRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      status: 500,
      error: { message: 'Erro mockado' },
    });
  });
});
