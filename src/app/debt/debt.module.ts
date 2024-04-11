import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebtCardComponent } from './debt-card/debt-card.component';
import { DebtsComponent } from './debts/debts.component';
import { DebtsMenuCardComponent } from './debts-menu-card/debts-menu-card.component';



@NgModule({
  declarations: [
    DebtCardComponent,
    DebtsComponent,
    DebtsMenuCardComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DebtCardComponent
  ]
})
export class DebtModule { }
