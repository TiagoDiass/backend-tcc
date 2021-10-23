import MongoProductRepository from './MongoProductRepository';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import Product from 'domain/entities/Product/Product';
import { mockProduct } from '@testUtils/productsMocks';

const COLLECTION_NAME = 'Products';

describe('MongoDB Repository: ServiceRepository', () => {
  const mongoConnection = new MongoConnection({
    address: process.env.MONGODB_TESTS_ADDRESS || '',
    user: process.env.MONGODB_TESTS_USER || '',
    password: process.env.MONGODB_TESTS_PASSWORD || '',
    databaseName: process.env.MONGODB_TESTS_DATABASE_NAME || '',
  });

  const mongoProductRepository = new MongoProductRepository(mongoConnection);

  afterAll(async () => {
    await mongoConnection.closeConnection();
  });

  test('method: save()', async () => {
    const product = mockProduct();
    const response = await mongoProductRepository.save(product);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Product);
    expect(response.data.id).toBe(product.id);
  });

  test('method: list()', async () => {
    const products = [mockProduct(), mockProduct(), mockProduct()];

    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).deleteMany({});
    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).insertMany(products);

    const response = await mongoProductRepository.list();

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(products.length);

    response.data.forEach((product, index) => {
      expect(product).toBeInstanceOf(Product);
      expect(product.id).toBe(products[index].id);
    });
  });

  test('method: findById() - product found sucessfully', async () => {
    const product = mockProduct();

    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).insertOne(product);

    const response = await mongoProductRepository.findById(product.id);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Product);
    expect(response.data?.id).toBe(product.id);
  });

  test('method: findById() - product not found', async () => {
    const response = await mongoProductRepository.findById('fake-id');

    expect(response.status).toBe(404);
    expect(response.data).toBeNull();
  });

  test('method: delete()', async () => {
    const product = mockProduct();

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(product);

    const response = await mongoProductRepository.delete(product.id);

    expect(response).toEqual({
      status: 200,
      data: product.id,
    });

    expect(await dbCollection.findOne({ id: product.id })).toBeNull();
  });

  test('method: update()', async () => {
    const product = mockProduct();
    const updatedProduct = new Product({
      ...product,
      name: 'nome atualizado',
    });

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(product);

    const response = await mongoProductRepository.update(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Product);
    expect(response.data).toMatchObject({
      id: updatedProduct.id,
      name: updatedProduct.name,
    });
  });
});
