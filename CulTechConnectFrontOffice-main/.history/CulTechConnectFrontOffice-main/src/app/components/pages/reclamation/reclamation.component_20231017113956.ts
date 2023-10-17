import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  reclamation: any = {}; 
  reclamationRequests: any[] = []; 
  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.loadReclamationRequests();
  }

  onSubmit() {
    // Submit the reclamation request to the service
    this.reclamationService.submitReclamation(this.reclamation).subscribe((response) => {
      // Clear the form and refresh the list of requests
      this.reclamation = {};
      this.loadReclamationRequests();
    });
  }

  loadReclamationRequests() {
    // Fetch reclamation requests from the service
    this.reclamationService.getReclamationRequests().subscribe((requests) => {
      this.reclamationRequests = requests;
    });
  }

}
