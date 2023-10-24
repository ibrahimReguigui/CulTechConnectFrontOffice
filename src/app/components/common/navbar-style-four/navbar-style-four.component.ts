
import {Component, Input, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {GlobalVarService} from '../../../services/global-var.service';
import {ChatService} from '../../../services/chat/chat.service';


@Component({
  selector: 'app-navbar-style-four',
  templateUrl: './navbar-style-four.component.html',
  styleUrls: ['./navbar-style-four.component.scss']
})
export class NavbarStyleFourComponent implements OnInit {
     unseenMessageNumber:number;
    constructor(private chatService:ChatService,private keycloak:KeycloakService,private globalVarService:GlobalVarService) {
    }
    userId:any
    authenticated:boolean;
    ngOnInit(): void {
        this.keycloak.loadUserProfile().then((userProfile) => {
            this.userId=userProfile.id
        })
        this.chatService.getAllMyMessage().subscribe(res => {
            console.log(res)
            this.unseenMessageNumber = res.filter(e => e.recipient == this.userId &&
                e.seen == false).length;
            console.log(this.unseenMessageNumber)
            this.globalVarService.nbrMessageUnseen$.next(this.unseenMessageNumber)
        });
        this.authenticated=this.keycloak.getKeycloakInstance().authenticated
        console.log(this.globalVarService.currentNbrMessageUnseen)
        this.unseenMessageNumber=this.globalVarService.currentNbrMessageUnseen
        this.globalVarService.nbrMessageUnseen$.subscribe(e=> {
                this.unseenMessageNumber = e;
                console.log(this.unseenMessageNumber);
            }
        )
    }

}
