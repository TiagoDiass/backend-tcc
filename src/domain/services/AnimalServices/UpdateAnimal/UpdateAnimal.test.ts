import UpdateAnimal from './UpdateAnimal';
import Animal from 'domain/entities/Animal/Animal';
import IAnimalRepository from 'domain/ports/AnimalRepository';
import { mockUpdateAnimalDTO, mockAnimal, mockAnimalRepository } from '@testUtils/animalsMocks';
import { IRequestUpdateAnimalDTO } from 'domain/services/dto';

describe('Service: UpdateAnimal', () => {
  it('should return correctly if animal was found and successfully updated', async () => {
    const updateAnimalDTO = mockUpdateAnimalDTO();
    const notUpdatedAnimal = new Animal({
      ...mockAnimal(),
      id: updateAnimalDTO.id,
    });
    const updatedAnimal = new Animal(updateAnimalDTO);

    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),
      findById: jest.fn().mockResolvedValue({ data: notUpdatedAnimal }),
      update: jest.fn().mockResolvedValue({ data: updatedAnimal }),
    };

    const updateAnimal = new UpdateAnimal(animalRepositoryMock);

    const response = await updateAnimal.execute(updateAnimalDTO);

    expect(animalRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(animalRepositoryMock.findById).toHaveBeenCalledWith(updateAnimalDTO.id);
    expect(animalRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(animalRepositoryMock.update).toHaveBeenCalledWith(updatedAnimal);

    expect(response).toEqual({
      status: 200,
      result: updatedAnimal,
    });
  });

  it('should return correctly if animal has not been found', async () => {
    const updateAnimalDTO = mockUpdateAnimalDTO();

    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const updateAnimal = new UpdateAnimal(animalRepositoryMock);

    const response = await updateAnimal.execute(updateAnimalDTO);

    expect(animalRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(animalRepositoryMock.findById).toHaveBeenCalledWith(updateAnimalDTO.id);
    expect(animalRepositoryMock.update).not.toHaveBeenCalled();

    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum animal cadastrado com o ID informado',
      },
    });
  });

  it('should return correctly if Animal entity throws an exception', async () => {
    const updateAnimalDTO: IRequestUpdateAnimalDTO = {
      ...mockUpdateAnimalDTO(),
      pictureUrl: 'invalid-url', // invalid url, so Animal entity will throw an exception
    };

    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockAnimal() }),
    };

    const updateAnimal = new UpdateAnimal(animalRepositoryMock);

    const response = await updateAnimal.execute(updateAnimalDTO);

    expect(animalRepositoryMock.update).not.toHaveBeenCalled();
    expect(response).toEqual({
      status: 400,
      error: {
        message: 'Animal inválido',
        errorsList: ['URL da foto do animal deve ser uma URL válida'],
      },
    });
  });

  it('should return correctly if TransactionRepository throws an exception', async () => {
    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),
      findById: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const updateAnimal = new UpdateAnimal(animalRepositoryMock);

    const response = await updateAnimal.execute(mockUpdateAnimalDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
        errorsList: [],
      },
    });
  });
});
