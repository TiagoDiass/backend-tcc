import { Request, Response } from 'express';
import AnimalController from 'adapters/controllers/AnimalController/AnimalController';

export default class ApiAnimalController {
  constructor(private readonly animalController: AnimalController) {}

  async list(req: Request, res: Response) {
    try {
      const response = await this.animalController.listAnimals();

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, type, size, gender, pictureUrl } = req.body;

      const response = await this.animalController.createAnimal({
        name,
        type,
        size,
        gender,
        pictureUrl,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.animalController.deleteAnimal({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await this.animalController.getAnimalById({ id });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, type, size, gender, pictureUrl } = req.body;

      const response = await this.animalController.updateAnimal({
        id,
        name,
        type,
        size,
        gender,
        pictureUrl,
      });

      res.status(response.status).json(response.result);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
