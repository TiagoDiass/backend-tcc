import GetAnimalById from './GetAnimalById';
import { mockAnimal, mockAnimalRepository, mockGetAnimalByIdDTO } from '@testUtils/animalsMocks';
import IAnimalRepository from 'domain/ports/AnimalRepository';

describe('Service: GetAnimalById', () => {
  it('should return correctly if animal has been found', async () => {
    const getAnimalByIdDTO = mockGetAnimalByIdDTO();
    const animalToBeReturned = mockAnimal();

    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),
      findById: jest.fn().mockResolvedValue({ data: animalToBeReturned }),
    };

    const getAnimalById = new GetAnimalById(animalRepositoryMock);
    const response = await getAnimalById.execute(getAnimalByIdDTO);

    expect(animalRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(animalRepositoryMock.findById).toHaveBeenCalledWith(getAnimalByIdDTO.id);
    expect(response).toEqual({
      status: 200,
      result: animalToBeReturned,
    });
  });

  it('should return correctly if animal has not been found', async () => {
    const animalRepositoryMock: IAnimalRepository = {
      ...mockAnimalRepository(),
      findById: jest.fn().mockResolvedValue({ data: null }),
    };

    const getAnimalById = new GetAnimalById(animalRepositoryMock);
    const response = await getAnimalById.execute(mockGetAnimalByIdDTO());

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

    const getAnimalById = new GetAnimalById(animalRepositoryMock);
    const response = await getAnimalById.execute(mockGetAnimalByIdDTO());

    expect(response).toEqual({
      status: 500,
      error: {
        message: 'Erro mockado',
      },
    });
  });
});
