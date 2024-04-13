import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BalanceDTO } from '../balance/dto';
import { forkJoin } from 'rxjs';

const BASE_URL = 'http://localhost:3000/balance'

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient, private router:Router) { }

  getMyBalancesByGroupId(groupId: number){
    return this.http.get<BalanceDTO>(BASE_URL + `/${groupId}`);
  }

  yourGroupBalances(groupIds: number[]){
    const requests = groupIds.map(groupId=>(this.http.get<{amount: number, currency: string}[]>(BASE_URL + `/yourgroupbalance/${groupId}`)))
    return forkJoin(requests);
  }
}
