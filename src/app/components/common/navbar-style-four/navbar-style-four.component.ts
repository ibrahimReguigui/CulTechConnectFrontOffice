import {Component, Input, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-navbar-style-four',
  templateUrl: './navbar-style-four.component.html',
  styleUrls: ['./navbar-style-four.component.scss']
})
export class NavbarStyleFourComponent implements OnInit {
    @Input() unseenMessageNumber:number;
    constructor(private keycloak:KeycloakService) { }
    authenticated:boolean;
    ngOnInit(): void {
        this.authenticated=this.keycloak.getKeycloakInstance().authenticated
    }

    login() {
        this.keycloak.login();
    }

    logout() {
        this.keycloak.logout();
    }
}
