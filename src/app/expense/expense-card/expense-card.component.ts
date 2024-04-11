import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { distributionTypesEnumMappings } from '../enum';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.css'],
})
export class ExpenseCardComponent {
  @Input() id!: number;
  @Input() expenseAmount!: number;
  @Input() expenseName!: string;
  @Input() youOwe!: number | null;
  @Input() currency!: string;
  @Input() payerName!: string;
  @Input() distributionTypeKey!: string;

  // distributionTypeValue: string = distributionTypesEnumMappings[this.distributionTypeKey]

  constructor(private router: Router) {}

  navigateToExpense(id: number) {
    console.log('navigateToExpense called', id);
    this.router.navigate([`expensedetails/${id}`]);
  }
}
