import MongoConnection from 'adapters/database/connection/MongoConnection';
import Medicine from 'domain/entities/Medicine/Medicine';
import IMedicineRepository from 'domain/ports/MedicineRepository';
import IRepositoryMethodResult from 'domain/ports/RepositoryMethodResult';

export default class MongoMedicineRepository implements IMedicineRepository {
  private readonly collectionName = 'Medicines';

  constructor(private readonly mongoConnection: MongoConnection) {}

  async save(medicine: Medicine): Promise<IRepositoryMethodResult<Medicine>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).insertOne(medicine);

    const createdMedicine = await db.collection(this.collectionName).findOne({ id: medicine.id });

    return {
      status: 200,
      data: new Medicine(createdMedicine),
    };
  }

  async list(): Promise<IRepositoryMethodResult<Medicine[]>> {
    const db = await this.mongoConnection.getConnection();

    const medicinesFromDatabase = await db.collection(this.collectionName).find().toArray();

    return {
      status: 200,
      data: medicinesFromDatabase.map(medicineFromDatabase => new Medicine(medicineFromDatabase)),
    };
  }

  async findById(id: string): Promise<IRepositoryMethodResult<Medicine | null>> {
    const db = await this.mongoConnection.getConnection();

    const medicineFromDatabase = await db.collection(this.collectionName).findOne({ id: id });

    return {
      status: medicineFromDatabase ? 200 : 404,
      data: medicineFromDatabase ? new Medicine(medicineFromDatabase) : null,
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

  async update(medicine: Medicine): Promise<IRepositoryMethodResult<Medicine>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).updateOne(
      { id: medicine.id },
      {
        $set: {
          name: medicine.name,
          description: medicine.description,
          expirationDate: medicine.expirationDate,
          amount: medicine.amount,
        } as Medicine,
      }
    );

    const updatedMedicine = await db.collection(this.collectionName).findOne({ id: medicine.id });

    return {
      status: 200,
      data: new Medicine(updatedMedicine),
    };
  }
}
