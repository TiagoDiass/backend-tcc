import Animal from 'domain/entities/Animal/Animal';

import IRepositoryMethodResult from 'domain/ports/RepositoryMethodResult';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import IAnimalRepository from 'domain/ports/AnimalRepository';

export default class MongoAnimalRepository implements IAnimalRepository {
  private readonly collectionName = 'Animals';

  constructor(private readonly mongoConnection: MongoConnection) {}

  async save(animal: Animal): Promise<IRepositoryMethodResult<Animal>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).insertOne(animal);

    const createdAnimal = await db.collection(this.collectionName).findOne({ id: animal.id });

    return {
      status: 200,
      data: new Animal(createdAnimal),
    };
  }

  async list(): Promise<IRepositoryMethodResult<Animal[]>> {
    const db = await this.mongoConnection.getConnection();

    const animalsFromDatabase = await db.collection(this.collectionName).find().toArray();

    return {
      status: 200,
      data: animalsFromDatabase.map(animalFromDatabase => new Animal(animalFromDatabase)),
    };
  }

  async findById(id: string): Promise<IRepositoryMethodResult<Animal | null>> {
    const db = await this.mongoConnection.getConnection();

    const animalFromDatabase = await db.collection(this.collectionName).findOne({ id: id });

    return {
      status: animalFromDatabase ? 200 : 404,
      data: animalFromDatabase ? new Animal(animalFromDatabase) : null,
    };
  }

  async delete(id: string): Promise<IRepositoryMethodResult<string>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).deleteOne({ id: id });

    return {
      status: 200,
      data: id,
    };
  }

  async update(animal: Animal): Promise<IRepositoryMethodResult<Animal>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).updateOne(
      { id: animal.id },
      {
        $set: {
          name: animal.name,
          type: animal.type,
          size: animal.size,
          gender: animal.gender,
          pictureUrl: animal.pictureUrl,
        } as Animal,
      }
    );

    const updatedAnimal = await db.collection(this.collectionName).findOne({ id: animal.id });

    return {
      status: 200,
      data: new Animal(updatedAnimal),
    };
  }
}
