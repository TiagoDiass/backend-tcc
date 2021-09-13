import Transaction from 'domain/entities/Transaction/Transaction';
import ITransactionRepository from 'domain/ports/TransactionRepository';
import IRepositoryMethodResult from 'domain/ports/RepositoryMethodResult';
import MongoConnection from 'adapters/database/connection/MongoConnection';

export default class MongoTransactionRepository implements ITransactionRepository {
  private readonly collectionName = 'Transactions';

  constructor(private readonly mongoConnection: MongoConnection) {}

  async save(transaction: Transaction): Promise<IRepositoryMethodResult<Transaction>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).insertOne(transaction);

    const createdTransaction = await db
      .collection(this.collectionName)
      .findOne({ id: transaction.id });

    return {
      status: 200,
      data: new Transaction(createdTransaction),
    };
  }

  async list(): Promise<IRepositoryMethodResult<Transaction[]>> {
    const db = await this.mongoConnection.getConnection();

    const transactionsFromDatabase = await db.collection(this.collectionName).find().toArray();

    return {
      status: 200,
      data: transactionsFromDatabase.map(
        transactionFromDatabase => new Transaction(transactionFromDatabase)
      ),
    };
  }

  async findById(id: string): Promise<IRepositoryMethodResult<Transaction | null>> {
    const db = await this.mongoConnection.getConnection();

    const transactionFromDatabase = await db.collection(this.collectionName).findOne({ id: id });

    return {
      status: transactionFromDatabase ? 200 : 404,
      data: transactionFromDatabase ? new Transaction(transactionFromDatabase) : null,
    };
  }

  async delete(id: string): Promise<IRepositoryMethodResult<Transaction['id']>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).deleteOne({ id: id });

    return {
      status: 200,
      data: id,
    };
  }

  async update(transaction: Transaction): Promise<IRepositoryMethodResult<Transaction>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).updateOne(
      { id: transaction.id },
      {
        $set: {
          title: transaction.title,
          value: transaction.value,
          type: transaction.type,
          date: transaction.date,
        } as Transaction,
      }
    );

    const updatedTransaction = await db
      .collection(this.collectionName)
      .findOne({ id: transaction.id });

    return {
      status: 200,
      data: new Transaction(updatedTransaction),
    };
  }
}
