import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePaymentDTO } from '../balance/dto';

const BASE_URL: string = 'http://localhost:3000/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  settleUp(dto: CreatePaymentDTO) {
    return this.http.post(BASE_URL, dto);
  }

  findByGroupId(groupId: number){
    return this.http.get(BASE_URL + `/group/${groupId}`);
  }
}
