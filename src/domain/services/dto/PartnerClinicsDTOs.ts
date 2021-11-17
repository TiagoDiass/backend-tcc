import { IPartnerClinicProperties } from 'domain/entities/PartnerClinic/PartnerClinic';

export type IRequestCreatePartnerClinicDTO = Omit<IPartnerClinicProperties, 'id'>;

export type IRequestGetPartnerClinicByIdDTO = { id: string };

export type IRequestDeletePartnerClinicDTO = { id: string };

export type IRequestUpdatePartnerClinicDTO = IPartnerClinicProperties & { id: string }; // id is optional on IPartnerClinicProperties, but not here
