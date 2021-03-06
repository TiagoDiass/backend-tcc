import { IAnimalProperties } from 'domain/entities/Animal/Animal';

export type IRequestCreateAnimalDTO = Omit<IAnimalProperties, 'id'>;

export type IRequestGetAnimalByIdDTO = { id: string };

export type IRequestDeleteAnimalDTO = { id: string };

export type IRequestUpdateAnimalDTO = IAnimalProperties & { id: string }; // id is optional on IAnimalProperties, but not here
