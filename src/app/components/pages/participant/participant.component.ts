import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParticipantService } from './participant.service';
import { Participant } from './participant.model';
import { Echange } from '../echange/echange.model';
import { UserService } from 'src/app/services/user/user.service';
import { EchangeService } from '../echange/echange.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {
  participantForm: FormGroup;
  participant:Participant;
  echanges: Echange[];


  constructor(
    private formBuilder: FormBuilder,
    private participantService: ParticipantService,
    private route: ActivatedRoute,
    private userService: UserService ,
    private echangeService: EchangeService// Inject your user service
    // Inject ActivatedRoute
  ) {
    this.participantForm = this.formBuilder.group({
      message: ['',Validators.required],
      echangeId:''
    });
  }

  ngOnInit(): void { 
  /*  this.userService.getProfile().subscribe(user => {
      if (user) {
        this.participantForm.patchValue({ user: user.firstName }); // Assuming 'username' is the user property to set
      }
    }); */ 
    
  }

  onSubmit() {
    
    if (this.participantForm.valid) {
      this.participant={
        user: this.participantForm.value.user,
        message: this.participantForm.value.message,
        statut: "PENDING",
        echange: {
           id: this.route.snapshot.params['echangeId']
         },
      }
    //console.log(this.participantForm.patchValue({ user:this.userService.getProfile }) );





      console.log(this.participant);

     console.log(this.route.snapshot.params['echangeId']);
     //=this.route.snapshot.params['echangeId'];
     console.log(this.participantForm.value);

      const participantData: Participant = this.participantForm.value;

      this.participantService.createParticipant(this.participant).subscribe((participant) => {
        console.log('Participant added:', participant);
        this.echangeService.participate(this.route.snapshot.params['echangeId']).subscribe((exchange) => {
          const index = this.echanges.findIndex((e) => e.id === exchange.id);
          if (index !== -1) {
            this.echanges[index] = exchange;
          }
        });
        // You can navigate to a different page or perform other actions after adding the participant
      });
    }
  }
}
