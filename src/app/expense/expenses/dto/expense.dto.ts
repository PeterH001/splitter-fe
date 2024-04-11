export interface ExpenseDTO {
    id: number
    name: string;
    amount: number;
    currency: string;
    distributionType: string;
    group: {
      id: number;
      name: string;
    };
  }
  