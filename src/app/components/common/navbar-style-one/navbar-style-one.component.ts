import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {ChatService} from '../../../services/chat/chat.service';
import {GlobalVarService} from '../../../services/global-var.service';

@Component({
    selector: 'app-navbar-style-one',
    templateUrl: './navbar-style-one.component.html',
    styleUrls: ['./navbar-style-one.component.scss']
})
export class NavbarStyleOneComponent implements OnInit {

    unseenMessageNumber: number;

    constructor(private chatService: ChatService, private keycloak: KeycloakService, private globalVarService: GlobalVarService) {
    }

    userId: any;
    authenticated: boolean;
    notifNumber: any;

    ngOnInit(): void {
        this.keycloak.loadUserProfile().then((userProfile) => {
            this.userId = userProfile.id;
        });
        this.chatService.getAllMyMessage().subscribe(res => {
            this.unseenMessageNumber = res.filter(e => e.recipient == this.userId &&
                e.seen == false).length;
            this.globalVarService.nbrMessageUnseen$.next(this.unseenMessageNumber);
        });
        this.authenticated = this.keycloak.getKeycloakInstance().authenticated;
        this.unseenMessageNumber = this.globalVarService.currentNbrMessageUnseen;
        this.globalVarService.nbrMessageUnseen$.subscribe(e => {
                this.unseenMessageNumber = e;
            }
        );
        this.globalVarService.nbrNotificationUnseen$.subscribe(e => {
                this.notifNumber = e;
                console.log(this.notifNumber);
            }
        );
        this.notifNumber = this.globalVarService.currentNbrNotificationUnseen;
    }


    login() {
        this.keycloak.login();
    }

    logout() {
        this.keycloak.logout();
    }

    set0(){
        this.globalVarService.nbrNotificationUnseen$.next(0)
    }
}
