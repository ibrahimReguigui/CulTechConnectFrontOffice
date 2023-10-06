import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-navbar-style-one',
  templateUrl: './navbar-style-one.component.html',
  styleUrls: ['./navbar-style-one.component.scss']
})
export class NavbarStyleOneComponent implements OnInit {

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
