import { mockMedicine } from '@testUtils/medicinesMocks';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import Medicine from 'domain/entities/Medicine/Medicine';
import MongoMedicineRepository from './MongoMedicineRepository';

const COLLECTION_NAME = 'Medicines';

describe('MongoDB Repository: MedicineRepository', () => {
  const mongoConnection = new MongoConnection({
    address: process.env.MONGODB_TESTS_ADDRESS || '',
    user: process.env.MONGODB_TESTS_USER || '',
    password: process.env.MONGODB_TESTS_PASSWORD || '',
    databaseName: process.env.MONGODB_TESTS_DATABASE_NAME || '',
  });

  const mongoMedicineRepository = new MongoMedicineRepository(mongoConnection);

  afterAll(async () => {
    await mongoConnection.closeConnection();
  });

  test('method: save()', async () => {
    const medicine = mockMedicine();
    const response = await mongoMedicineRepository.save(medicine);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Medicine);
    expect(response.data.id).toBe(medicine.id);
  });

  test('method: list()', async () => {
    const medicines = [mockMedicine(), mockMedicine(), mockMedicine()];

    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).deleteMany({});
    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).insertMany(medicines);

    const response = await mongoMedicineRepository.list();

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(medicines.length);

    response.data.forEach((medicine, index) => {
      expect(medicine).toBeInstanceOf(Medicine);
      expect(medicine.id).toBe(medicines[index].id);
    });
  });

  test('method: findById() - medicine found sucessfully', async () => {
    const medicine = mockMedicine();

    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).insertOne(medicine);

    const response = await mongoMedicineRepository.findById(medicine.id);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Medicine);
    expect(response.data?.id).toBe(medicine.id);
  });

  test('method: findById() - medicine not found', async () => {
    const response = await mongoMedicineRepository.findById('fake-id');

    expect(response.status).toBe(404);
    expect(response.data).toBeNull();
  });

  test('method: delete()', async () => {
    const medicine = mockMedicine();

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(medicine);

    const response = await mongoMedicineRepository.delete(medicine.id);

    expect(response).toEqual({
      status: 200,
      data: medicine.id,
    });

    expect(await dbCollection.findOne({ id: medicine.id })).toBeNull();
  });

  test('method: update()', async () => {
    const medicine = mockMedicine();
    const updatedMedicine = new Medicine({
      ...medicine,
      name: 'nome atualizado',
    });

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(medicine);

    const response = await mongoMedicineRepository.update(updatedMedicine);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Medicine);
    expect(response.data).toMatchObject({
      id: updatedMedicine.id,
      name: updatedMedicine.name,
    });
  });
});
