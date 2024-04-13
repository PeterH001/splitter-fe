import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { GroupDetailsDTO } from '../dto';
import { BalanceService } from 'src/app/services/balance.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css'],
})
export class GroupDetailsComponent implements OnInit {
  id!: number;
  details!: GroupDetailsDTO;

  //TODO: ne any legyen
  balanceInformation: any;

  //TODO: ne any legyen
  payments: any;

  expenses!: {
    id: number;
    name: string;
    amount: number;
    currency: string;
    category: string;
    distribution: string;
    debtAmount: number | null;
    payerName: string;
  }[];
  members!: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
  }[];
  balanceOfUsers!: {
    userId: number;
    username: string;
    sumDebtsByCurrencies: { sumAmount: number; currency: string }[];
  }[];

  loaded: boolean = false;

  constructor(
    private groupService: GroupService,
    private balanceService: BalanceService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    //TODO: forkJoin
    this.groupService.getGroupDetailsById(this.id).subscribe((result) => {
      this.details = result;
      this.expenses = this.details.expenses;
      this.members = this.details.members;
      this.balanceOfUsers = this.details.balanceOfUser;
      this.loaded = true;
    });

    this.balanceService
      .getMyBalancesByGroupId(this.id)
      .subscribe((response) => (this.balanceInformation = response));

    this.paymentService.findByGroupId(this.id).subscribe((response) => {
      this.payments = response;
      console.log('payments:', this.payments);
    });
  }
  goBack() {
    this.router.navigate(['/groups']);
  }

  navigateToAddExpense() {
    this.router.navigate(['/group', this.id, 'addexpense']);
  }

  navigateToEdit() {
    this.router.navigate(['/group', this.id, 'edit']);
  }

  navigateToBalances() {
    this.router.navigate(['/group', this.id, 'balances']);
  }
}
