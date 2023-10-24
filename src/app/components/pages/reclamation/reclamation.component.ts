import { Component, OnInit, Renderer2, ElementRef  } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';


@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {

  reclamation: any = {}; 
  reclamationRequests: any[] = []; 
  showThankYouPopup: boolean = false;
  userId: string;
  loggedInUser: KeycloakProfile;


  
  constructor(private reclamationService: ReclamationService,private renderer: Renderer2, private el: ElementRef, private keycloak: KeycloakService) { }

  ngOnInit(): void {
    this.loadReclamationRequests();

    this.keycloak.loadUserProfile().then((userProfile) => {
      this.userId = userProfile.id;
      this.loggedInUser = userProfile;
   
      console.log (this.userId) ;
      console.log (this.loggedInUser.firstName) ;
  });
  }


  loadReclamationRequests() {
    
    this.reclamationService.getReclamations().subscribe((requests) => {
      this.reclamationRequests = requests;
    });
  }

  openDialog() {
    const dialog = this.el.nativeElement.querySelector('#custom-dialog');
    this.renderer.setStyle(dialog, 'display', 'flex');
  }

  closeDialog() {
    const dialog = this.el.nativeElement.querySelector('#custom-dialog');
    this.renderer.setStyle(dialog, 'display', 'none');
  }


  onSubmit() {
    //this.openDialog(); 

    this.reclamationService.addReclamation(this.reclamation).subscribe((response) => {
      this.openDialog(); 
      this.reclamation = {};
      this.loadReclamationRequests();
     },
      (error) => {
        
        console.error('Error:', error);
      }
    );

  }

}
