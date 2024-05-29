import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { GroupDetailsDTO } from '../dto';
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css'],
})
export class GroupDetailsComponent implements OnInit {
  id!: number;
  details!: GroupDetailsDTO;

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
  balanceOfUser!: {
    balances: {
      id: number;
      groupId: number;
      you: {
        id: number;
        username: string;
      };
      other: {
        id: number;
        username: string;
      };
      youOwe: { amount: number; currency: string }[];
      youAreOwed: { amount: number; currency: string }[];
    }[];
    yourBalanceInGroup: { amount: number; currency: string }[];
  };
  payments!: {
    userAId: number;
    userAname: string;
    userAPaid: {
      amount: number;
      currency: string;
    }[];
    userBId: number;
    userBname: string;
    userBPaid: {
      amount: number;
      currency: string;
    }[];
  }[];

  loaded: boolean = false;
  simplifyDebts: boolean = false;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    this.groupService.getGroupDetailsById(this.id).subscribe((result) => {
      this.details = result;
      this.expenses = this.details.expenses;
      this.members = this.details.members;
      this.balanceOfUser = this.details.balanceOfUser;
      this.payments = this.details.payments;
      this.loaded = true;
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
