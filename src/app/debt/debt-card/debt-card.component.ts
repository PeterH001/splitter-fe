import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-debt-card',
  templateUrl: './debt-card.component.html',
  styleUrls: ['./debt-card.component.css'],
})
export class DebtCardComponent implements OnInit{
  @Input() name!: string;
  @Input() amount!: number;
  @Input() currency!: string;
  @Input() debt!: any;
  ngOnInit(): void {
    // console.log("name", this.name);
    // console.log("amount", this.amount);
    // console.log("currency", this.currency);
    console.log("debt", this.debt);
    
  }
}
