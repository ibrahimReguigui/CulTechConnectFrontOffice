import { Component, OnInit } from '@angular/core';
import { Echange } from '../echange/echange.model';
import { ActivatedRoute } from '@angular/router';
import { EchangeService } from '../echange/echange.service';

@Component({
  selector: 'app-echange-details',
  templateUrl: './echange-details.component.html',
  styleUrls: ['./echange-details.component.scss']
})
export class EchangeDetailsComponent implements OnInit {

  echange: Echange;

  constructor(
    private route: ActivatedRoute,
    private echangeService: EchangeService
  ) {}

  ngOnInit(): void {
    // Get the Echange ID from the route parameters
    this.route.params.subscribe((params) => {
      const id = +params['id']; // Convert the string ID to a number
      if (!isNaN(id)) {
        // Fetch the Echange details by ID
        this.echangeService.getEchange(id).subscribe((echange) => {
          this.echange = echange;
        });
      }
    });
  }
}







