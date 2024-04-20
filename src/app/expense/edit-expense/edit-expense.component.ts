import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { amountSumValidator, percentSumValidator } from '../validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { GroupService } from 'src/app/services/group.service';
import { Location } from '@angular/common';
import { GetExpenseDTO } from '../dto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css'],
})
export class EditExpenseComponent implements OnInit {
  editExpenseForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    payerId: new FormControl(-1, [Validators.required, Validators.min(0)]),
    groupId: new FormControl(-1, [Validators.min(0), Validators.required]),
    amount: new FormControl<number | null>(null, [Validators.required]),
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
    exactAmountsDebtData: new FormControl<{ userId: number; amount: number }[]>(
      [],
      [amountSumValidator('distributionType', 'amount')]
    ),
  });

  expenseDetails!: GetExpenseDTO;
  groupMembers!: { id: number; username: string }[];
  selectedGroupMembers: number[] = [];
  proportionalMembers: { userId: number; percent: number }[] = [];
  exactAmountsMembers: { userId: number; amount: number }[] = [];
  categories!: string[];
  distributionTypes!: string[];
  currencies!: string[];
  expenseId!: number;

  constructor(
    private expenseService: ExpenseService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    const expenseId = this.route.snapshot.paramMap.get('id');
    this.expenseId = parseInt(expenseId!);
    console.log(this.expenseId);

    this.expenseService.getExpenseById(this.expenseId).subscribe((response) => {
      this.expenseDetails = response;
      console.log('response:', response);

      this.expenseService.getExpenseCategories().subscribe((result) => {
        this.categories = result;
      });
      this.groupService
        .getGroupMembersById(this.expenseDetails.groupId)
        .subscribe((result) => {
          this.groupMembers = result;
        });
      this.expenseService.getCurrencies().subscribe((result) => {
        this.currencies = result;
      });
      this.expenseService.getExpenseDistributions().subscribe((result) => {
        this.distributionTypes = result;
      });
      console.log(this.expenseDetails);
      this.editExpenseForm
        .get('name')
        ?.setValue(this.expenseDetails.expenseName);
      this.editExpenseForm
        .get('payerId')
        ?.setValue(this.expenseDetails.payerId);
      this.editExpenseForm
        .get('groupId')
        ?.setValue(this.expenseDetails.groupId);
      this.editExpenseForm.get('amount')?.setValue(this.expenseDetails.amount);
      this.editExpenseForm
        .get('currency')
        ?.setValue(this.expenseDetails.currency);
      this.editExpenseForm
        .get('category')
        ?.setValue(this.expenseDetails.category);
      this.editExpenseForm
        .get('description')
        ?.setValue(this.expenseDetails.description);
      this.editExpenseForm
        .get('distributionType')
        ?.setValue(this.expenseDetails.distribution);
      this.selectedGroupMembers = this.expenseDetails.debts.map(
        (debt) => debt.userId
      );
      this.editExpenseForm.get('userIds')?.setValue(this.selectedGroupMembers);
      this.exactAmountsMembers =
        this.expenseDetails.distribution === 'exact_amounts'
          ? this.expenseDetails.debts.map((debt) => ({
              userId: debt.userId,
              amount: debt.amount,
            }))
          : [];
      this.editExpenseForm
        .get('exactAmountsDebtData')
        ?.setValue(this.exactAmountsMembers);
      this.proportionalMembers =
        this.expenseDetails.distribution === 'proportional'
          ? this.expenseDetails.debts.map((debt) => ({
              userId: debt.userId,
              percent: (debt.amount / this.expenseDetails.amount) * 100,
            }))
          : [];
      this.editExpenseForm
        .get('proportionalDebtsData')
        ?.setValue(this.proportionalMembers);
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
    this.editExpenseForm.get('userIds')?.setValue(this.selectedGroupMembers);
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
    });
    this.editExpenseForm.get('userIds')?.setValue(this.selectedGroupMembers);
    this.editExpenseForm
      .get('proportionalDebtsData')
      ?.setValue(this.proportionalMembers);
  }

  toggleExactAmountlSelection(userId: number, amountString: string) {
    const amount = parseInt(amountString);
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
    });
    this.editExpenseForm.get('userIds')?.setValue(this.selectedGroupMembers);
    this.editExpenseForm
      .get('exactAmountsDebtData')
      ?.setValue(this.exactAmountsMembers);

    console.log('userIds', this.editExpenseForm.get('userIds')?.value);

  }

  isChecked(id: number) {
    return this.selectedGroupMembers.find((userId) => userId === id)
      ? true
      : false;
  }

  goBack() {
    this.location.back();
  }

  submitForm() {
    this.expenseService
      .updateExpenseById(this.expenseDetails.id, this.editExpenseForm.value)
      .subscribe(() => {
        this.router.navigate(['/expensedetails', this.expenseDetails.id]);
      });
  }
  getPercent(memberId: number) {
    return this.proportionalMembers
      .find((debt) => debt.userId === memberId)
      ?.percent.toString();
  }
  getAmount(memberId: number) {
    return this.exactAmountsMembers
      .find((debt) => debt.userId === memberId)
      ?.amount.toString();
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  deleteExpense() {
    this.expenseService.deleteExpenseById(this.expenseDetails.id).subscribe((response)=>{
      console.log(response);
      this.router.navigate(['/groupdetails', this.expenseDetails.groupId])
    })
  }

  distributionTypeChanged() {
    if(this.distributionType?.value === "proportional"){
      this.selectedGroupMembers = [];
     this.exactAmountsMembers = [];
     this.editExpenseForm.get('exactAmountsDebtData')?.setValue([])
     this.editExpenseForm.get('userIds')?.setValue([]);
   }
   else if(this.distributionType?.value === "exact_amounts"){
     this.selectedGroupMembers = [];
     this.proportionalMembers = [];
     this.editExpenseForm.get('proportionalDebtsData')?.setValue([]);
     this.editExpenseForm.get('userIds')?.setValue([]);
   }
   else if(this.distributionType?.value === "equal"){
     this.selectedGroupMembers = [];
     this.proportionalMembers = [];
     this.editExpenseForm.get('proportionalDebtsData')?.setValue([]);
     this.exactAmountsMembers = [];
     this.editExpenseForm.get('exactAmountsDebtData')?.setValue([])
     this.editExpenseForm.get('userIds')?.setValue([]);
    }
   }

  get name() {
    return this.editExpenseForm.get('name');
  }
  get currency() {
    return this.editExpenseForm.get('currency');
  }
  get amount() {
    return this.editExpenseForm.get('amount');
  }
  get payerId() {
    return this.editExpenseForm.get('payerId');
  }
  get category() {
    return this.editExpenseForm.get('category');
  }
  get distributionType() {
    return this.editExpenseForm.get('distributionType');
  }
  get userIds() {
    return this.editExpenseForm.get('userIds');
  }
  get proportionalDebtsData() {
    return this.editExpenseForm.get('proportionalDebtsData');
  }
  get exactAmountsDebtData() {
    return this.editExpenseForm.get('exactAmountsDebtData');
  }
}
