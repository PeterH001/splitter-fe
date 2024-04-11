import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance/balance.component';
import { BalanceCardComponent } from './balance-card/balance-card.component';
import { SettleUpComponent } from './settle-up/settle-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BalanceComponent,
    BalanceCardComponent,
    SettleUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BalanceModule { }
