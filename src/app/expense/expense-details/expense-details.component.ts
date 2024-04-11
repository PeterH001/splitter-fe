import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css'],
})
export class ExpenseDetailsComponent implements OnInit {
navigateToEdit() {
this.router.navigate(['/expense', this.id, 'edit'])
}

  id!: number;
  expenseDetails: any;
  debts: any;

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.expenseService.getExpenseById(this.id).subscribe((result) => {
      this.expenseDetails = result;
      this.debts = this.expenseDetails.debts;
      console.log('expenseDetails: ', this.expenseDetails);
      console.log('debts: ', this.debts);
    });
  }

  goBack() {
    this.location.back();
  }
}
