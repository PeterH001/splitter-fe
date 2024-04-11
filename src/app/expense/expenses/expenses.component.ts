import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { ExpenseDTO } from './dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  navigateToExpense(id: number) {
    this.router.navigate(['/expensedetails', id])
  }
  expenses!: ExpenseDTO[];
  constructor(private expenseService: ExpenseService, private router: Router) {}
  ngOnInit(): void {
    this.expenseService.getMyExpenses().subscribe((result) => {
      this.expenses = result;
      console.log('expenses: ', this.expenses);
    });
  }
  // expenses = [
  //   {
  //     id: 1,
  //     expenseAmount: 2500,
  //     youOwe: 300,
  //     currency: 'HUF',
  //     groupName: 'Borok',
  //     payerName: 'Bede',
  //     distributionType: 'equally',
  //   },
  //   {
  //     id: 2,
  //     expenseAmount: 10000,
  //     youOwe: 2000,
  //     currency: 'HUF',
  //     groupName: 'Jegyek',
  //     payerName: 'Csilla',
  //     distributionType: 'equally',
  //   },
  //   {
  //     id: 1,
  //     expenseAmount: 5500,
  //     youOwe: 900,
  //     currency: 'HUF',
  //     groupName: 'Fagyi',
  //     payerName: 'Peti',
  //     distributionType: 'exactly',
  //   },
  // ];
}
