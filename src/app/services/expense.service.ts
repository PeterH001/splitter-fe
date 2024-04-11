import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseDTO } from '../expense/expenses/dto';
import { GetExpenseDTO } from '../expense/dto';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseUrl: string = 'http://localhost:3000/expense';

  constructor(private http: HttpClient) {}

  getExpenseById(id: number) {
    return this.http.get<GetExpenseDTO>(this.baseUrl + `/${id}`);
  }

  updateExpenseById(id: number, expenseData: Partial<{ name: string | null; payerId: number | string | null; groupId: number | null; amount: number | null; currency: string | null; category: string | null; distributionType: string | null; description: string | null; userIds: number[] | null; proportionalDebtsData: { userId: number; percent: number; }[] | null; exactAmountsDebtData: { userId: number; amount: number; }[] | null; }>) {
    expenseData.payerId = parseInt(expenseData.payerId as string);
    
    return this.http.patch<GetExpenseDTO>(this.baseUrl + `/${id}`, expenseData);
  }

  getMyExpenses() {
    return this.http.get<ExpenseDTO[]>(this.baseUrl + `/myexpenses`);
  }

  getExpenseCategories() {
    return this.http.get<string[]>(this.baseUrl + `/categories`);
  }

  getExpenseDistributions() {
    return this.http.get<string[]>(this.baseUrl + `/distributiontypes`);
  }

  getCurrencies() {
    return this.http.get<string[]>(this.baseUrl + `/currencies`);
  }

  //a payerId és az exactAmountsDebtData.amount kasztolgatásásra azért van szükség, 
  //mert valamiért stringet kapok a formControlból number helyett, de nem szól miatta a fordító
  createExpense(
    createExpenseData: Partial<{
      name: string | null;
      payerId: number | string | null;
      groupId: number | null;
      amount: string | null;
      currency: string | null;
      category: string | null;
      distributionType: string | null;
      description: string | null;
      userIds: number[] | null;
      proportionalDebtsData: { userId: number; percent: number }[] | null;
      exactAmountsDebtData: { userId: number; amount: number | string }[] | null;
    }>
  ) {
    console.log('createExpense called');
    console.log(createExpenseData);

    createExpenseData.payerId = parseInt(createExpenseData.payerId as string);
    createExpenseData.exactAmountsDebtData = createExpenseData.exactAmountsDebtData?.map(debtData=>{
      const amount: number = parseInt(debtData.amount as string);
      return {userId: debtData.userId, amount}
    })
    console.log(createExpenseData);
    return this.http.post<any>(this.baseUrl, createExpenseData);
  }

  deleteExpenseById(id: number){
    return this.http.delete(this.baseUrl + `/${id}`);
  }
}
