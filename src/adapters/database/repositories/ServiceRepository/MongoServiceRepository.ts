import Service from 'domain/entities/Service/Service';
import IRepositoryMethodResult from 'domain/ports/RepositoryMethodResult';
import IServiceRepository from 'domain/ports/ServiceRepository';
import MongoConnection from 'adapters/database/connection/MongoConnection';

export default class MongoServiceRepository implements IServiceRepository {
  private readonly collectionName = 'Services';

  constructor(private readonly mongoConnection: MongoConnection) {}

  async save(service: Service): Promise<IRepositoryMethodResult<Service>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).insertOne(service);

    const createdService = await db.collection(this.collectionName).findOne({ id: service.id });

    return {
      status: 200,
      data: new Service(createdService),
    };
  }

  async list(): Promise<IRepositoryMethodResult<Service[]>> {
    const db = await this.mongoConnection.getConnection();

    const servicesFromDatabase = await db.collection(this.collectionName).find().toArray();

    return {
      status: 200,
      data: servicesFromDatabase.map(serviceFromDatabase => new Service(serviceFromDatabase)),
    };
  }

  async findById(id: string): Promise<IRepositoryMethodResult<Service | null>> {
    const db = await this.mongoConnection.getConnection();

    const serviceFromDatabase = await db.collection(this.collectionName).findOne({ id: id });

    return {
      status: serviceFromDatabase ? 200 : 404,
      data: serviceFromDatabase ? new Service(serviceFromDatabase) : null,
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

  async update(service: Service): Promise<IRepositoryMethodResult<Service>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).updateOne(
      { id: service.id },
      {
        $set: {
          title: service.title,
          description: service.description,
        } as Service,
      }
    );

    const updatedService = await db.collection(this.collectionName).findOne({ id: service.id });

    return {
      status: 200,
      data: new Service(updatedService),
    };
  }
}
