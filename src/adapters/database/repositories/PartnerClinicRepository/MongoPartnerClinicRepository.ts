import IRepositoryMethodResult from 'domain/ports/RepositoryMethodResult';
import MongoConnection from 'adapters/database/connection/MongoConnection';
import IPartnerClinicRepository from 'domain/ports/PartnerClinicRepository';
import PartnerClinic from 'domain/entities/PartnerClinic/PartnerClinic';
import { Address } from 'domain/valueObjects';

export default class MongoPartnerClinicRepository implements IPartnerClinicRepository {
  private readonly collectionName = 'PartnerClinics';

  constructor(private readonly mongoConnection: MongoConnection) {}

  async save(partnerClinic: PartnerClinic): Promise<IRepositoryMethodResult<PartnerClinic>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).insertOne(partnerClinic);

    const createdClinic = await db
      .collection(this.collectionName)
      .findOne({ id: partnerClinic.id });

    return {
      status: 200,
      data: new PartnerClinic({ ...createdClinic, address: new Address(createdClinic.address) }),
    };
  }

  async list(): Promise<IRepositoryMethodResult<PartnerClinic[]>> {
    const db = await this.mongoConnection.getConnection();

    const clinicsFromDatabase = await db.collection(this.collectionName).find().toArray();

    return {
      status: 200,
      data: clinicsFromDatabase.map(
        clinicFromDatabase =>
          new PartnerClinic({
            ...clinicFromDatabase,
            address: new Address(clinicFromDatabase.address),
          })
      ),
    };
  }

  async findById(id: string): Promise<IRepositoryMethodResult<PartnerClinic | null>> {
    const db = await this.mongoConnection.getConnection();

    const clinicFromDatabase = await db.collection(this.collectionName).findOne({ id: id });

    return {
      status: clinicFromDatabase ? 200 : 404,
      data: clinicFromDatabase
        ? new PartnerClinic({
            ...clinicFromDatabase,
            address: new Address(clinicFromDatabase.address),
          })
        : null,
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

  async update(partnerClinic: PartnerClinic): Promise<IRepositoryMethodResult<PartnerClinic>> {
    const db = await this.mongoConnection.getConnection();

    await db.collection(this.collectionName).updateOne(
      { id: partnerClinic.id },
      {
        $set: {
          name: partnerClinic.name,
          email: partnerClinic.email,
          cnpj: partnerClinic.cnpj,
          phone: partnerClinic.phone,
          address: partnerClinic.address,
        } as PartnerClinic,
      }
    );

    const updatedClinic = await db
      .collection(this.collectionName)
      .findOne({ id: partnerClinic.id });

    return {
      status: 200,
      data: new PartnerClinic({ ...updatedClinic, address: new Address(updatedClinic.address) }),
    };
  }
}
