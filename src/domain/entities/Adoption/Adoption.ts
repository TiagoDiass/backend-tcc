import { Address } from 'domain/valueObjects';
import Animal from 'domain/entities/Animal/Animal';

export interface IAdoptionProperties {
  id?: string;
  adopter: {
    name: string;
    phone: string;
    address: Address;
  };
  animal: Animal;
}
