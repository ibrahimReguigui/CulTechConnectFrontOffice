import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../services/auth-service.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {KeycloakService} from 'keycloak-angular';
import {UserDto} from '../../models/UserDto';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

    newPasswordFormControl: string = '';
    errorMessage: string = '';

    user: string = "Utilisateur Connecté"; // Remplacez par le nom d'utilisateur connecté
    currentDate: Date = new Date();



    constructor(private authService: AuthServiceService,
                private router: Router,
                private readonly keycloak: KeycloakService) { }
userDto:UserDto;
  ngOnInit(): void {
      this.authService.getProfile().subscribe(res => {
          this.userDto=res
          console.log(this.userDto);
      });
  }

    changePassword(passwordForm: NgForm): void {
        if (passwordForm.valid) {
            this.authService.changePassword(this.newPasswordFormControl).subscribe(
                (response) => {
                    console.log('Mot de passe changé avec succès :', response);
                    this.logout();
                    passwordForm.reset();
                    this.router.navigate(['/profile']);
                },
                (error) => {
                    console.error('Erreur lors du changement de mot de passe :', error);
                }
            );
        } else {
            passwordForm.controls.newPassword.markAsTouched();
            this.errorMessage = 'Le formulaire n\'est pas valide. Veuillez corriger les erreurs.';
        }
    }

    logout() {
        this.keycloak.logout('http://localhost:4200/');
    }
}
