import {
  mockAnimal,
  mockAnimalRepository,
  mockCreateAnimalDTO,
  mockDeleteAnimalDTO,
  mockGetAnimalByIdDTO,
  mockUpdateAnimalDTO,
} from '@testUtils/animalsMocks';
import AnimalController from './AnimalController';

/**
 * @factory returns the S.U.T (system under test), which is the AnimalController in this case
 */
const makeSut = () => {
  const animalRepositoryMock = mockAnimalRepository();
  const animalController = new AnimalController(animalRepositoryMock);

  return { animalController };
};

// MOCKS before tests run

// ListAnimals mock
const animalsToBeReturned = [mockAnimal(), mockAnimal()];

const mockListAnimalsExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: animalsToBeReturned })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/AnimalServices/ListAnimals/ListAnimals', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockListAnimalsExecute,
  }));
});

// CreateAnimal mock
const createdAnimalMock = mockAnimal();
const errorCreateAnimalMock = {
  message: 'Erro ao criar animal',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
} as const;
const mockCreateAnimalExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 201, result: createdAnimalMock })
  .mockResolvedValueOnce({ status: 400, error: errorCreateAnimalMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/AnimalServices/CreateAnimal/CreateAnimal', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockCreateAnimalExecute,
  }));
});

// DeleteAnimal mock
const deletedAnimalMock = mockAnimal();
const errorDeleteAnimalMock = {
  message: 'Animal não encontrado',
} as const;
const mockDeleteAnimalExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: deletedAnimalMock.id })
  .mockResolvedValueOnce({ status: 404, error: errorDeleteAnimalMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/AnimalServices/DeleteAnimal/DeleteAnimal', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockDeleteAnimalExecute,
  }));
});

// GetAnimalById mock
const foundAnimalMock = mockAnimal();
const errorGetAnimalByIdMock = {
  message: 'Animal não encontrado',
} as const;
const mockGetAnimalByIdExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: foundAnimalMock })
  .mockResolvedValueOnce({ status: 404, error: errorGetAnimalByIdMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/AnimalServices/GetAnimalById/GetAnimalById', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockGetAnimalByIdExecute,
  }));
});

// UpdateAnimal mock
const updatedAnimalMock = mockAnimal();
const errorUpdateAnimalMock = {
  message: 'Erro ao atualizar animal',
  errorsList: ['campo inválido 1', 'campo inválido 2'],
} as const;
const mockUpdateAnimalExecute = jest
  .fn()
  .mockResolvedValueOnce({ status: 200, result: updatedAnimalMock })
  .mockResolvedValueOnce({ status: 400, error: errorUpdateAnimalMock })
  .mockImplementationOnce(() => {
    throw new Error('Erro mockado');
  });

jest.mock('domain/services/AnimalServices/UpdateAnimal/UpdateAnimal', () => {
  return jest.fn().mockImplementation(() => ({
    execute: mockUpdateAnimalExecute,
  }));
});

describe('Controller: AnimalController', () => {
  describe('listAnimals method', () => {
    it('should return correctly (list successfully)', async () => {
      const { animalController } = makeSut();

      const response = await animalController.listAnimals();

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Lista de animais obtida com sucesso',
          data: animalsToBeReturned,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { animalController } = makeSut();

      const response = await animalController.listAnimals();

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao listar animais: Erro mockado',
        },
      });
    });
  });

  describe('createAnimal method', () => {
    it('should return correctly (created successfully)', async () => {
      const { animalController } = makeSut();

      const response = await animalController.createAnimal(mockCreateAnimalDTO());

      expect(response).toEqual({
        status: 201,
        result: {
          message: 'Animal criado com sucesso',
          data: createdAnimalMock,
        },
      });
    });

    it('should return correctly (not created, invalid fields)', async () => {
      const { animalController } = makeSut();

      const response = await animalController.createAnimal(mockCreateAnimalDTO());

      expect(response).toEqual({
        status: 400,
        result: {
          message: errorCreateAnimalMock.message,
          errors: errorCreateAnimalMock.errorsList,
          data: null,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { animalController } = makeSut();

      const response = await animalController.createAnimal(mockCreateAnimalDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao executar a criação de um animal: Erro mockado',
        },
      });
    });
  });

  describe('deleteAnimal method', () => {
    it('should return correctly (successfully deleted)', async () => {
      const { animalController } = makeSut();

      const response = await animalController.deleteAnimal({
        id: deletedAnimalMock.id,
      });

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Animal excluído com sucesso',
          data: deletedAnimalMock.id,
        },
      });
    });

    it('should return correctly (animal not found)', async () => {
      const { animalController } = makeSut();

      const response = await animalController.deleteAnimal(mockDeleteAnimalDTO());

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorDeleteAnimalMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exceptions occurs', async () => {
      const { animalController } = makeSut();

      const response = await animalController.deleteAnimal(mockDeleteAnimalDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao excluir animal: Erro mockado',
        },
      });
    });
  });

  describe('getAnimalById method', () => {
    it('should return correctly (animal successfully found)', async () => {
      const { animalController } = makeSut();

      const response = await animalController.getAnimalById(mockGetAnimalByIdDTO());

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Animal obtido com sucesso',
          data: foundAnimalMock,
        },
      });
    });

    it('should return correctly (animal not found)', async () => {
      const { animalController } = makeSut();

      const response = await animalController.getAnimalById(mockGetAnimalByIdDTO());

      expect(response).toEqual({
        status: 404,
        result: {
          message: errorGetAnimalByIdMock.message,
          data: null,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { animalController } = makeSut();

      const response = await animalController.getAnimalById(mockGetAnimalByIdDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao obter animal: Erro mockado',
        },
      });
    });
  });

  describe('updateAnimal method', () => {
    it('should return correctly (updated succesfully)', async () => {
      const { animalController } = makeSut();

      const response = await animalController.updateAnimal(mockUpdateAnimalDTO());

      expect(response).toEqual({
        status: 200,
        result: {
          message: 'Animal atualizado com sucesso',
          data: updatedAnimalMock,
        },
      });
    });

    it('should return correctly (not updated, invalid fields)', async () => {
      const { animalController } = makeSut();

      const response = await animalController.updateAnimal(mockUpdateAnimalDTO());

      expect(response).toEqual({
        status: 400,
        result: {
          message: errorUpdateAnimalMock.message,
          data: null,
          errors: errorUpdateAnimalMock.errorsList,
        },
      });
    });

    it('should return correctly if an exception occurs', async () => {
      const { animalController } = makeSut();

      const response = await animalController.updateAnimal(mockUpdateAnimalDTO());

      expect(response).toEqual({
        status: 500,
        result: {
          message: 'Erro inesperado ao executar a atualização de um animal: Erro mockado',
        },
      });
    });
  });
});
