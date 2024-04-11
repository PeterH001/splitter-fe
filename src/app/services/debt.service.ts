import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DebtDTO } from '../debt/dto';

const BASE_URL = 'http://localhost:3000/debt';

@Injectable({
  providedIn: 'root',
})
export class DebtService {
  constructor(private http: HttpClient) {}

  getMyDebts() {
    return this.http.get<DebtDTO[]>(BASE_URL + '/mydebts');
  }
}
