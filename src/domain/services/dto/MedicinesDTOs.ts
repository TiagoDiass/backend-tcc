import { IMedicineProperties } from 'domain/entities/Medicine/Medicine';

export type IRequestCreateMedicineDTO = Omit<IMedicineProperties, 'id'>;

export type IRequestGetMedicineByIdDTO = { id: string };

export type IRequestDeleteMedicineDTO = { id: string };

export type IRequestUpdateMedicineDTO = IMedicineProperties & { id: string }; // id is optional on IMedicineProperties, but not here
