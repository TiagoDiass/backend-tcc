import Product from 'domain/entities/Product/Product';
import IRepositoryMethodResult from 'domain/ports/RepositoryMethodResult';
import IProductRepository from 'domain/ports/ProductRepository';
import MongoConnection from 'adapters/database/connection/MongoConnection';

export default class MongoProductRepository implements IProductRepository {
  private readonly collectionName = 'Products';

  constructor(private readonly mongoConnection: MongoConnection) {}

  async save(product: Product): Promise<IRepositoryMethodResult<Product>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).insertOne(product);

    const createdProduct = await db.collection(this.collectionName).findOne({ id: product.id });

    return {
      status: 200,
      data: new Product(createdProduct),
    };
  }

  async list(): Promise<IRepositoryMethodResult<Product[]>> {
    const db = await this.mongoConnection.getConnection();

    const productsFromDatabase = await db.collection(this.collectionName).find().toArray();

    return {
      status: 200,
      data: productsFromDatabase.map(productFromDatabase => new Product(productFromDatabase)),
    };
  }

  async findById(id: string): Promise<IRepositoryMethodResult<Product | null>> {
    const db = await this.mongoConnection.getConnection();

    const productFromDatabase = await db.collection(this.collectionName).findOne({ id: id });

    return {
      status: productFromDatabase ? 200 : 404,
      data: productFromDatabase ? new Product(productFromDatabase) : null,
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

  async update(product: Product): Promise<IRepositoryMethodResult<Product>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).updateOne(
      { id: product.id },
      {
        $set: {
          name: product.name,
          description: product.description,
        } as Product,
      }
    );

    const updatedProduct = await db.collection(this.collectionName).findOne({ id: product.id });

    return {
      status: 200,
      data: new Product(updatedProduct),
    };
  }
}
