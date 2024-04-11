import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance-card',
  templateUrl: './balance-card.component.html',
  styleUrls: ['./balance-card.component.css'],
})
export class BalanceCardComponent implements OnInit{
  @Input() payerId!: number;
  @Input() payerUsername!: string;
  @Input() recieverId!: number;
  @Input() recieverUsername!: string;
  @Input() amount!: number;
  @Input() currency!: string;

  ngOnInit(): void {
    //TODO: elérhető currencyket lekérdezni
  }
}
