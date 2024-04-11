import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from 'src/app/services/payment.service';
import { CreatePaymentDTO } from '../dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrls: ['./settle-up.component.css'],
})
export class SettleUpComponent implements OnInit {
  @Input() payerId!: number;
  @Input() payerUsername!: string;
  @Input() recieverId!: number;
  @Input() recieverUsername!: string;
  @Input() initialAmount!: number;
  @Input() initialCurrency!: string;
  @Input() balanceId!: number;
  @Input() currencies!: string[];
  @Input() groupId!: number;

  settleUpForm = new FormGroup({
    amount: new FormControl<number | null>(null, Validators.required),
    currency: new FormControl<string>('', Validators.required),
  });

  constructor(
    public activeModal: NgbActiveModal,
    private paymentService: PaymentService,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log("groupId: ", this.groupId);
    
    this.settleUpForm.get('amount')?.setValue(this.initialAmount);
    this.settleUpForm.get('currency')?.setValue(this.initialCurrency);
  }

  submitForm() {
    const formValue = this.settleUpForm.value;
    const dto: CreatePaymentDTO = {
      userId: this.payerId,
      amount: formValue.amount!,
      currency: formValue.currency!,
      balanceId: this.balanceId,
    };
    console.log(dto);
    
    this.paymentService.settleUp(dto).subscribe(()=>{
      this.activeModal.close();
      this.router.navigate(['/groupdetails', this.groupId])
    });
  }

  get amount() {
    return this.settleUpForm.get('amount');
  }
  get currency() {
    return this.settleUpForm.get('currency');
  }
}
