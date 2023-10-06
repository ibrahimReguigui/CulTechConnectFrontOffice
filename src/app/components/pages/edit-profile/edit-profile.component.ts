import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserDto } from '../../models/UserDto';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
    profileForm: FormGroup;
    userDto: UserDto;
    successMessage: string | null = null;

    currentDate: Date = new Date();

    constructor(private fb: FormBuilder, private authService: AuthServiceService) {
        this.profileForm = this.fb.group({
            firstName: [''],
            lastName: [''],
            phoneNumber: [''],
            image: ['']
        });

        this.userDto = new UserDto();
    }

    ngOnInit(): void {}

    onSubmit() {
        this.userDto.firstName = this.profileForm.get('firstName').value;
        this.userDto.lastName = this.profileForm.get('lastName').value;
        this.userDto.phoneNumber = this.profileForm.get('phoneNumber').value;
        this.userDto.image = this.profileForm.get('image').value;

        this.authService.updateProfile(this.userDto).subscribe(
            (response) => {
                console.log('Profil mis à jour avec succès !', response);
                this.onSubmitSuccess();
            },
            (error) => {
                console.error('Erreur lors de la mise à jour du profil :', error);
            }
        );
    }

    onSubmitSuccess() {
        this.successMessage = 'Modification réussie !';
    }
}
