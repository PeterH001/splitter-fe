export interface GetExpenseDTO {
  id: number;
  expenseName: string;
  amount: number;
  category: string;
  currency: string;
  description: string;
  distribution: string;
  payerId: number;
  payerName: string;
  groupId: number;
  debts: {
    amount: number;
    currency: string;
    expenseId: number;
    name: string;
    userId: number;
  }[];
}
