import { ITransactionProperties } from 'domain/entities/Transaction';

export type IRequestCreateTransactionDTO = Omit<ITransactionProperties, 'id'>;

// export type IRequestDeleteTransactionDTO = {
//   id: string;
// };

// export type IRequestGetTransactionByIdDTO = {
//   id: string;
// };

// export type IRequestUpdateTransactionDTO = {
//   id: string;
//   title: string;
//   description?: string;
// };
