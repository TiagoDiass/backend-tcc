import { mockAnimal, mockAnimalRepository, mockDeleteAnimalDTO } from '@testUtils/animalsMocks';
import DeleteAnimal from './DeleteAnimal';
import IAnimalRepository from 'domain/ports/AnimalRepository';

describe('Service: DeleteAnimal', () => {
  it('should return correctly if animal has been deleted successfully', async () => {
    const deleteAnimalDTO = mockDeleteAnimalDTO();

    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),
      findById: jest.fn().mockResolvedValue({ data: mockAnimal() }),
      delete: jest.fn().mockResolvedValue({ data: deleteAnimalDTO.id }),
    };

    const deleteAnimal = new DeleteAnimal(animalRepositoryMock);

    const response = await deleteAnimal.execute(deleteAnimalDTO);

    expect(animalRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(animalRepositoryMock.findById).toHaveBeenCalledWith(deleteAnimalDTO.id);
    expect(animalRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(animalRepositoryMock.delete).toHaveBeenCalledWith(deleteAnimalDTO.id);

    expect(response).toEqual({
      status: 200,
      result: deleteAnimalDTO.id,
    });
  });

  it('should return correctly if there is no animal with the received id', async () => {
    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const deleteAnimal = new DeleteAnimal(animalRepositoryMock);

    const response = await deleteAnimal.execute(mockDeleteAnimalDTO());

    expect(animalRepositoryMock.delete).not.toHaveBeenCalled();
    expect(response).toEqual({
      status: 404,
      error: {
        message: 'Não há nenhum animal cadastrado com o ID informado',
      },
    });
  });

  it('should return correctly if AnimalRepository throws an exception', async () => {
    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),
      findById: jest.fn().mockImplementation(() => {
        throw new Error('Erro mockado');
      }),
    };

    const deleteAnimal = new DeleteAnimal(animalRepositoryMock);

    const response = await deleteAnimal.execute(mockDeleteAnimalDTO());

    expect(animalRepositoryMock.delete).not.toHaveBeenCalled();
    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
