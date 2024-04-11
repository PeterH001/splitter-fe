import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debts-menu-card',
  templateUrl: './debts-menu-card.component.html',
  styleUrls: ['./debts-menu-card.component.css'],
})
export class DebtsMenuCardComponent {
  @Input() userId!: number;
  @Input() amount!: number;
  @Input() currency!: string;
  @Input() payerId!: number;
  @Input() payerName!: string;
  @Input() groupId!: number;
  @Input() groupName!: string;
  @Input() expenseId!: number;
  @Input() expenseName!: string;

  constructor(private router: Router) {}

  navigateToGroup(id: number) {
    this.router.navigate(['/groupdetails', id]);
  }

  navigateToExpense(id: number) {
    this.router.navigate(['/expensedetails', id]);
  }
}
