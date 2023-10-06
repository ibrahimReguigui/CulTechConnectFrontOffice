import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../../models/UserDto';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;
    userDto: UserDto = new UserDto();
    errorMessage: string;

    roles: string[] = ['PARTNER', 'MEMBER'];
    userForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthServiceService ,private router: Router) { }

    ngOnInit(): void {
        this.userForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.maxLength(50)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')]],
            role: ['', Validators.required]
        });
    }

    registerUser() {

            console.log(this.userDto);
            this.authService.registration(this.userDto)
                .subscribe(
                    response => {
                        console.log('Réponse : ', response);
                        this.router.navigate(['/']);
                    },
                    error => {
                        console.error('Erreur: ', error);
                        this.errorMessage = 'Une erreur s\'est produite lors de l\'inscription.';
                    }
                );

    }

    isValidEmail(email: string): boolean {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    isValidPassword(password: string): boolean {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        return passwordPattern.test(password) && password.length >= 8;
    }
}
