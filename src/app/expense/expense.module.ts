import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseCardComponent } from './expense-card/expense-card.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { DebtModule } from '../debt/debt.module';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseMenuCardComponent } from './expense-menu-card/expense-menu-card.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';



@NgModule({
  declarations: [
    ExpenseCardComponent,
    ExpensesComponent,
    ExpenseDetailsComponent,
    CreateExpenseComponent,
    ExpenseMenuCardComponent,
    EditExpenseComponent,
  ],
  imports: [
    CommonModule,
    DebtModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ExpenseCardComponent
  ]
})
export class ExpenseModule { }
