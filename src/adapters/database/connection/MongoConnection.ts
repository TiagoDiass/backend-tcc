import { MongoClient, Db } from 'mongodb';

type AccessData = {
  protocol?: string;
  address: string;
  port?: string;
  user: string;
  password: string;
  databaseName: string;
};

/**
 * Base class to connect to a MongoDB database.
 * @class {MongoConnection}
 */
export default class MongoConnection {
  private database: Db | undefined;
  private connection: MongoClient | undefined;

  constructor(private readonly accessData: AccessData) {}

  public async getConnection(): Promise<Db> {
    if (this.database) {
      return this.database;
    }

    const protocol = this.accessData.protocol || 'mongodb://';
    const address = this.accessData.address;
    const port = this.accessData.port || '27017';
    const user = this.accessData.user;
    const password = this.accessData.password;
    const databaseName = this.accessData.databaseName;

    if (!(protocol && address && port && user && password && databaseName)) {
      throw new Error('Faltam dados para conectar ao banco');
    }

    const url =
      protocol +
      user +
      ':' +
      password +
      '@' +
      address +
      (protocol.endsWith('srv://') ? '' : ':' + port);

    const mongoClient = new MongoClient(url, { useUnifiedTopology: true });
    this.connection = mongoClient;

    try {
      await mongoClient.connect();
      const db = mongoClient.db(databaseName);
      this.database = db;
      return db;
    } catch (error: any) {
      console.error(error);
      return error.message;
    }
  }

  async closeConnection() {
    if (this.connection) {
      await this.connection.close();
    }
  }
}
