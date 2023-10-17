import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  reclamation: any = {}; // A model to store the current reclamation request
  reclamationRequests: any[] = []; 
  constructor() { }

  ngOnInit(): void {
  }

}
