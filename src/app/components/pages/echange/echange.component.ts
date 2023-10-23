import { Component, OnInit, ViewChild } from '@angular/core';
import { EchangeService } from './echange.service';
import { Echange } from './echange.model';

@Component({
  selector: 'app-echange',
  templateUrl: './echange.component.html',
  styleUrls: ['./echange.component.scss']
})
export class EchangeComponent implements OnInit {




  echanges: Echange[];
  pageSize = 3; // Number of items to display per page
  currentPage = 1;

  constructor(private echangeService: EchangeService) { }

  ngOnInit() {
    this.echangeService.getEchanges().subscribe(echanges => {
      this.echanges = echanges;
    });  

  }
 

}
