export interface GetMyGroupsDTO {
  groupId: number;
  groupName: string;
  debtsByCurrencies: { amount: number; currency: string }[];
}
