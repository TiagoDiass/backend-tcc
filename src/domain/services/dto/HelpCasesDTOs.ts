import { IHelpCaseProperties } from 'domain/entities/HelpCase/HelpCase';

export type IRequestCreateHelpCaseDTO = Omit<IHelpCaseProperties, 'id'>;

export type IRequestGetHelpCaseByIdDTO = { id: string };

export type IRequestDeleteHelpCaseDTO = { id: string };

export type IRequestUpdateHelpCaseDTO = IHelpCaseProperties & { id: string }; // id is optional on IHelpCaseProperties, but not here
