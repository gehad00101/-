export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  date: Date;
  description: string;
  amount: number;
  category: string;
};
