import { ITransactionProperties } from 'domain/entities/Transaction/Transaction';

export type IRequestCreateTransactionDTO = Omit<ITransactionProperties, 'id'>;

export type IRequestGetTransactionByIdDTO = {
  id: string;
};

export type IRequestDeleteTransactionDTO = {
  id: string;
};

export type IRequestUpdateTransactionDTO = {
  id: string;
  title: string;
  value: number;
  type: 'deposit' | 'withdraw';
  date: string;
};
