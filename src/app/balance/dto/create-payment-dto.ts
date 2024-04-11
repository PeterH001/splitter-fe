export interface CreatePaymentDTO {
  userId: number;
  amount: number;
  currency: string;
  balanceId: number;
}
