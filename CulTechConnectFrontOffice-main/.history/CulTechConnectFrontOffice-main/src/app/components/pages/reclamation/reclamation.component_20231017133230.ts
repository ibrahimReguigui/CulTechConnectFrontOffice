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
  showThankYouPopup: boolean = false;


  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.loadReclamationRequests();
  }

  onSubmit() {
    // Submit the reclamation request to the service
    this.reclamationService.submitReclamation(this.reclamation).subscribe((response) => {
      // Clear the form and refresh the list of requests
    
      this.reclamation = {}; } );
    
  }


  loadReclamationRequests() {
    // Fetch reclamation requests from the service
    this.reclamationService.getReclamationRequests().subscribe((requests) => {
      this.reclamationRequests = requests;
    });
  }

  openDialog() {
    const dialog = document.getElementById('custom-dialog');
    if (dialog) {
      dialog.style.display = 'block';
    }
  }

  closeDialog() {
    const dialog = document.getElementById('custom-dialog');
    if (dialog) {
      dialog.style.display = 'none';
    }
  }

  // openPopup() {
  //   const modalRef = this.reclamationService.open(ReclamationComponent);
  //   modalRef.componentInstance.title = 'Dialog Title';

  //   modalRef.result.then((result) => {
  //     if (result === 'cancelled') {
  //       console.log('Dialog was cancelled');
  //     } else {
  //       console.log('Dialog result:', result);
       
  //     }
  //   }).catch((error) => {
  //     console.log('Dialog dismissed');
  //   });
  // }

}
