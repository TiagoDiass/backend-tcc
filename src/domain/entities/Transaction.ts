import { uuid } from 'uuidv4';

interface ITransactionProperties {
  id?: string;
  title: string;
  value: number;
  type: 'deposit' | 'withdraw';
  date: string;
}

export default class Transaction {
  public readonly id: string;
  public readonly title: string;
  public readonly value: number;
  public readonly type: 'deposit' | 'withdraw';
  public readonly date: string;

  constructor({
    id = uuid(),
    title,
    value,
    type,
    date,
  }: ITransactionProperties) {
    this.id = id;
    this.title = title;
    this.value = value;
    this.type = type;
    this.date = date;
  }
}
