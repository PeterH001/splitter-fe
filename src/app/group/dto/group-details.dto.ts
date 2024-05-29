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
    balances: {
      id: number;
      groupId: number;
      you: {
        id: number;
        username: string;
      };
      other: {
        id: number;
        username: string;
      };
      youOwe: { amount: number; currency: string }[];
      youAreOwed: { amount: number; currency: string }[];
    }[];
    yourBalanceInGroup: { amount: number; currency: string }[];
  };
  payments: {
    userAId: number;
    userAname: string;
    userAPaid: {
      amount: number;
      currency: string;
    }[];
    userBId: number;
    userBname: string;
    userBPaid: {
      amount: number;
      currency: string;
    }[];
  }[];
}
