import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.css']
})
export class PaymentCardComponent {
  @Input() payerId!: number;
  @Input() payerUsername!: string;
  @Input() recieverId!: number;
  @Input() recieverUsername!: string;
  @Input() amount!: number;
  @Input() currency!: string;
}
