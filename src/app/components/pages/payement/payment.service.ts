import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from './Payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8096/api/payment'; // Replace with your actual API endpoint


  constructor(private http: HttpClient) { }
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/getPayments`);
  }

  addPayment(payment: Payment): Observable<Payment> {
    console.log(payment);
    return this.http.post<Payment>(`${this.apiUrl}/addPayment`, payment);
  }
}
