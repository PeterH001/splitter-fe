import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { GroupService } from 'src/app/services/group.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { amountSumValidator, percentSumValidator } from '../validators';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
})
export class CreateExpenseComponent implements OnInit {
  createExpenseForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    payerId: new FormControl(-1, [Validators.required, Validators.min(0)]),
    groupId: new FormControl(-1, [Validators.min(0), Validators.required]),
    amount: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    distributionType: new FormControl('', Validators.required),
    description: new FormControl(''),
    userIds: new FormControl<number[]>(
      [],
      [Validators.required, Validators.minLength(1)]
    ),
    proportionalDebtsData: new FormControl<
      { userId: number; percent: number }[]
    >([], [percentSumValidator('distributionType')]),
    exactAmountsDebtData: new FormControl<
      { userId: number; amount: number }[]
    >([], [amountSumValidator('distributionType', 'amount')]),
  });

  groupMembers!: { id: number; username: string }[];
  selectedGroupMembers: number[] = [];
  proportionalMembers: { userId: number; percent: number }[] = [];
  exactAmountsMembers: { userId: number; amount: number }[] = [];
  groupId!: number;
  categories!: string[];
  distributionTypes!: string[];
  currencies!: string[];
  constructor(
    private expenseService: ExpenseService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const groupId = this.route.snapshot.paramMap.get('id');
    this.groupId = parseInt(groupId!);
    const groupIdControl = this.createExpenseForm.get('groupId');
    if (groupIdControl !== null) {
      groupIdControl.setValue(this.groupId);
    }
    
    this.expenseService.getExpenseCategories().subscribe((result) => {
      this.categories = result;
    });
    this.groupService.getGroupMembersById(this.groupId).subscribe((result) => {
      this.groupMembers = result;
    });
    this.expenseService.getCurrencies().subscribe((result) => {
      this.currencies = result;
    });
    this.expenseService.getExpenseDistributions().subscribe((result) => {
      this.distributionTypes = result;
    });
  }

  toggleSelection(userId: number) {
    if (this.selectedGroupMembers.includes(userId)) {
      this.selectedGroupMembers = this.selectedGroupMembers.filter(
        (item) => item !== userId
      );
    } else {
      this.selectedGroupMembers.push(userId);
    }
    this.createExpenseForm.get('userIds')?.setValue(this.selectedGroupMembers);
  }

  toggleProportionalSelection(userId: number, percent: number) {
    const index = this.proportionalMembers.findIndex(
      (memberObj) => memberObj.userId === userId
    );
    if (percent) {
      if (index !== -1) {
        this.proportionalMembers[index].percent = percent;
      } else {
        this.proportionalMembers.push({ userId: userId, percent: percent });
      }
    } else {
      if (index !== -1) {
        this.proportionalMembers.splice(index, 1);
      }
    }
    this.selectedGroupMembers = this.proportionalMembers.map((memberObj) => {
      console.log(memberObj.percent);
      return memberObj.userId;
      
    }
    );
    this.createExpenseForm.get('userIds')?.setValue(this.selectedGroupMembers);
    this.createExpenseForm
      .get('proportionalDebtsData')
      ?.setValue(this.proportionalMembers);
  }

  toggleExactAmountlSelection(userId: number, amount: number) {
    const index = this.exactAmountsMembers.findIndex(
      (memberObj) => memberObj.userId === userId
    );
    if (amount) {
      if (index !== -1) {
        this.exactAmountsMembers[index].amount = amount;
      } else {
        this.exactAmountsMembers.push({ userId: userId, amount: amount });
      }
    } else {
      if (index !== -1) {
        this.exactAmountsMembers.splice(index, 1);
      }
    }
    this.selectedGroupMembers = this.exactAmountsMembers.map((memberObj) => {
      console.log(memberObj.amount);
      return memberObj.userId;
      
    }
    );
    this.createExpenseForm.get('userIds')?.setValue(this.selectedGroupMembers);
    this.createExpenseForm
      .get('exactAmountsDebtData')
      ?.setValue(this.exactAmountsMembers);

      console.log("userIds",this.createExpenseForm
        .get('userIds')?.value);
      console.log("exactAmountsDebtData",this.createExpenseForm
        .get('exactAmountsDebtData')?.value);
      
  }

  isChecked(id: number) {
    return !!this.selectedGroupMembers.find((userId) => userId === id);
  }

  goBack() {
    this.router.navigate(['/groupdetails', this.groupId]);
  }

  submitForm(): void {
    console.log(this.createExpenseForm.value);

    this.expenseService
      .createExpense(this.createExpenseForm.value)
      .subscribe(() => {
        this.router.navigate(['/groupdetails', this.groupId]);
      });
  }
  get name() {
    return this.createExpenseForm.get('name');
  }
  get currency() {
    return this.createExpenseForm.get('currency');
  }
  get amount() {
    return this.createExpenseForm.get('amount');
  }
  get payerId() {
    return this.createExpenseForm.get('payerId');
  }
  get category() {
    return this.createExpenseForm.get('category');
  }
  get distributionType() {
    return this.createExpenseForm.get('distributionType');
  }
  get userIds() {
    return this.createExpenseForm.get('userIds');
  }
  get proportionalDebtsData() {
    return this.createExpenseForm.get('proportionalDebtsData');
  }
  get exactAmountsDebtData() {
    return this.createExpenseForm.get('exactAmountsDebtData');
  }
}
