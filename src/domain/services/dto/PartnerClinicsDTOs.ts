import { IPartnerClinicProperties } from 'domain/entities/PartnerClinic/PartnerClinic';

export type IRequestCreatePartnerClinicDTO = {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: {
    cep: string;
    street: string;
    number: number;
    complement?: string;
    district: string;
    city: string;
    state: string;
  };
};

export type IRequestGetPartnerClinicByIdDTO = { id: string };

export type IRequestDeletePartnerClinicDTO = { id: string };

export type IRequestUpdatePartnerClinicDTO = IPartnerClinicProperties & { id: string }; // id is optional on IPartnerClinicProperties, but not here
