export interface GroupDetailsDTO {
  id: number;
  name: string;
  members: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
  }[];
  expenses: {
    id: number;
    name: string;
    amount: number;
    currency: string;
    category: string;
    distribution: string;
    debtAmount: number | null;
    payerName: string;
    isUserInvolved: boolean;
  }[];
  balanceOfUser: {
    userId: number;
    username: string;
    sumDebtsByCurrencies: {
      sumAmount: number;
      currency: string;
    }[];
  }[];
}
