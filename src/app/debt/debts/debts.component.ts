import { Component, OnInit } from '@angular/core';
import { DebtService } from 'src/app/services/debt.service';
import { DebtDTO } from '../dto';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css']
})
export class DebtsComponent implements OnInit{
  debts!: DebtDTO[];


  constructor(private debtService: DebtService){}

  ngOnInit(): void {
    this.debtService.getMyDebts().subscribe(result=>{
      this.debts = result;
      console.log("result: ", this.debts);
    })
  }

}
