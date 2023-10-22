import { Component, OnInit } from '@angular/core';
import { Payment } from './Payment.model';
import { PaymentService } from './payment.service';
import { Country } from './Country.enum';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss']
})
export class PayementComponent implements OnInit {
  newPayment: Payment = new Payment();



  constructor( private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.newPayment = new Payment(); // Clear the form
    this.newPayment.montant = 256;
    
    
    // Set the initial value to 256


  }
  addNewPayment() {
    this.paymentService.addPayment(this.newPayment).subscribe((addedPayment) => {
      // Do something with the added payment if needed
      console.log('New payment added:', addedPayment);
    },
    (error) => {
      console.log(error);
      // Handle the error
    });
  }
  getFlagImagePath(): string {
    return `assets/flags/${this.newPayment.country}.png`;
  }

}
