import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BalanceDTO } from '../balance/dto';

const BASE_URL = 'http://localhost:3000/balance'

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient, private router:Router) { }

  getMyBalancesByGroupId(groupId: number){
    return this.http.get<BalanceDTO[]>(BASE_URL + `/${groupId}`)
  }
}
