import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-menu-card',
  templateUrl: './expense-menu-card.component.html',
  styleUrls: ['./expense-menu-card.component.css']
})
export class ExpenseMenuCardComponent {
  constructor(private router: Router){}
navigateToGroup(id: number) {
 this.router.navigate(['/groupdetails', id])
}
  @Input() id!: number;
  @Input() name!: string;
  @Input() amount!: number;
  @Input() currency!: string;
  @Input() groupName!: string;
  @Input() distributionType!: string;
}
