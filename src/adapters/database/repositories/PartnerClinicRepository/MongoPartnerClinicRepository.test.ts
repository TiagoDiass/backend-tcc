import MongoPartnerClinicRepository from './MongoPartnerClinicRepository';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import { mockPartnerClinic } from '@testUtils/partnerClinicsMocks';
import PartnerClinic from 'domain/entities/PartnerClinic/PartnerClinic';

const COLLECTION_NAME = 'PartnerClinics';

describe('MongoDB Repository: PartnerClinicRepository', () => {
  const mongoConnection = new MongoConnection({
    address: process.env.MONGODB_TESTS_ADDRESS || '',
    user: process.env.MONGODB_TESTS_USER || '',
    password: process.env.MONGODB_TESTS_PASSWORD || '',
    databaseName: process.env.MONGODB_TESTS_DATABASE_NAME || '',
  });

  const mongoPartnerClinicRepository = new MongoPartnerClinicRepository(mongoConnection);

  afterAll(async () => {
    await mongoConnection.closeConnection();
  });

  test('method: save()', async () => {
    const clinic = mockPartnerClinic();
    const response = await mongoPartnerClinicRepository.save(clinic);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(PartnerClinic);
    expect(response.data.id).toBe(clinic.id);
  });

  test('method: list()', async () => {
    const clinics = [mockPartnerClinic(), mockPartnerClinic(), mockPartnerClinic()];

    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).deleteMany({});
    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).insertMany(clinics);

    const response = await mongoPartnerClinicRepository.list();

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(clinics.length);

    response.data.forEach((clinic, index) => {
      expect(clinic).toBeInstanceOf(PartnerClinic);
      expect(clinic.id).toBe(clinics[index].id);
    });
  });

  test('method: findById() - clinic found sucessfully', async () => {
    const clinic = mockPartnerClinic();

    await (await mongoConnection.getConnection()).collection(COLLECTION_NAME).insertOne(clinic);

    const response = await mongoPartnerClinicRepository.findById(clinic.id);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(PartnerClinic);
    expect(response.data?.id).toBe(clinic.id);
  });

  test('method: findById() - clinic not found', async () => {
    const response = await mongoPartnerClinicRepository.findById('fake-id');

    expect(response.status).toBe(404);
    expect(response.data).toBeNull();
  });

  test('method: delete()', async () => {
    const clinic = mockPartnerClinic();

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(clinic);

    const response = await mongoPartnerClinicRepository.delete(clinic.id);

    expect(response).toEqual({
      status: 200,
      data: clinic.id,
    });

    expect(await dbCollection.findOne({ id: clinic.id })).toBeNull();
  });

  test('method: update()', async () => {
    const clinic = mockPartnerClinic();
    const updatedClinic = new PartnerClinic({
      ...clinic,
      name: 'nome atualizado',
    });

    const dbCollection = (await mongoConnection.getConnection()).collection(COLLECTION_NAME);

    await dbCollection.insertOne(clinic);

    const response = await mongoPartnerClinicRepository.update(updatedClinic);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(PartnerClinic);
    expect(response.data).toMatchObject({
      id: updatedClinic.id,
      name: updatedClinic.name,
    });
  });
});
