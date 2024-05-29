import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BalanceService } from 'src/app/services/balance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettleUpComponent } from '../settle-up/settle-up.component';
import { BalanceDTO } from '../dto';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  balanceInformation!: BalanceDTO;
  currencies!: string[]
  groupId!: number;

  constructor(
    private balanceService: BalanceService,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.groupId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    this.balanceService
      .getMyBalancesByGroupId(this.groupId)
      .subscribe((response) => {
        console.log('balances: ', response);
        this.balanceInformation = response;
      });

      this.expenseService.getCurrencies().subscribe(response=>this.currencies = response)
  }

  goBack() {
    this.location.back();
  }

  openModal(payerId: number, payerUsername: string, recieverId: number, recieverUsername: string, amount: number, currency: string, balanceId: number){
    const modalRef = this.modalService.open(SettleUpComponent, { centered: true, backdrop: 'static' });
		modalRef.componentInstance.payerId = payerId;
		modalRef.componentInstance.payerUsername = payerUsername;
		modalRef.componentInstance.recieverId = recieverId;
		modalRef.componentInstance.recieverUsername = recieverUsername;
		modalRef.componentInstance.initialAmount = amount;
		modalRef.componentInstance.initialCurrency = currency;
		modalRef.componentInstance.balanceId = balanceId;
		modalRef.componentInstance.currencies = this.currencies;
		modalRef.componentInstance.groupId = this.groupId;
  }
}
