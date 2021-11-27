import MongoConnection from 'adapters/database/connection/MongoConnection';
import HelpCase from 'domain/entities/HelpCase/HelpCase';
import IHelpCaseRepository from 'domain/ports/HelpCaseRepository';
import IRepositoryMethodResult from 'domain/ports/RepositoryMethodResult';

export default class MongoHelpCaseRepository implements IHelpCaseRepository {
  private readonly collectionName = 'HelpCases';

  constructor(private readonly mongoConnection: MongoConnection) {}

  async save(helpCase: HelpCase): Promise<IRepositoryMethodResult<HelpCase>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).insertOne(helpCase);

    const createdHelpCase = await db.collection(this.collectionName).findOne({ id: helpCase.id });

    return {
      status: 200,
      data: new HelpCase(createdHelpCase),
    };
  }

  async list(): Promise<IRepositoryMethodResult<HelpCase[]>> {
    const db = await this.mongoConnection.getConnection();

    const helpCasesFromDatabase = await db.collection(this.collectionName).find().toArray();

    return {
      status: 200,
      data: helpCasesFromDatabase.map(helpCaseFromDatabase => new HelpCase(helpCaseFromDatabase)),
    };
  }

  async findById(id: string): Promise<IRepositoryMethodResult<HelpCase | null>> {
    const db = await this.mongoConnection.getConnection();

    const helpCaseFromDatabase = await db.collection(this.collectionName).findOne({ id: id });

    return {
      status: helpCaseFromDatabase ? 200 : 404,
      data: helpCaseFromDatabase ? new HelpCase(helpCaseFromDatabase) : null,
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

  async update(helpCase: HelpCase): Promise<IRepositoryMethodResult<HelpCase>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).updateOne(
      { id: helpCase.id },
      {
        $set: {
          title: helpCase.title,
          description: helpCase.description,
          pictures: helpCase.pictures,
          poolMoneyUrl: helpCase.poolMoneyUrl,
        } as HelpCase,
      }
    );

    const updatedHelpCase = await db.collection(this.collectionName).findOne({ id: helpCase.id });

    return {
      status: 200,
      data: new HelpCase(updatedHelpCase),
    };
  }
}
