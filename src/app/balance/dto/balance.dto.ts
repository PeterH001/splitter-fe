export interface BalanceDTO {
  balances: {
    id: number;
    groupId: number;
    you: { id: number; username: string };
    other: { id: number; username: string };
    youOwe: { amount: number; currency: string }[];
    youAreOwed: { amount: number; currency: string }[];
  }[];
  yourBalanceInGroup: {
    amount: number;
    currency: string;
  }[];
}
