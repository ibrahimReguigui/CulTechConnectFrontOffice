import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../../services/blog-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../../models/UserDto';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FileServiceService } from '../../services/file-service.service';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

@Component({
    selector: 'app-create-blog',
    templateUrl: './create-blog.component.html',
    styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
    userDto: UserDto;
    successMessage = '';
    currentDate: Date = new Date();
    blog: { title: string; content: string } = { title: '', content: '' };

    blogForm: FormGroup;

    selectedFiles: FileList | null = null;

    userId: string;

    loggedInUser: KeycloakProfile;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private blogService: BlogServiceService,
        private authService: AuthServiceService,
        private fileService: FileServiceService,
        private keycloak: KeycloakService
    ) {
        this.blogForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.keycloak.loadUserProfile().then((userProfile) => {
            this.userId = userProfile.id;
            this.loggedInUser = userProfile;
            console.log(this.loggedInUser);
            console.log(this.userId);
            console.log(userProfile);
        });
    }

    onFileChanged(event: any): void {
        this.selectedFiles = event.target.files;
    }

    onSubmit(): void {
        if (this.selectedFiles) {
            const formData = new FormData();
            for (let i = 0; i < this.selectedFiles.length; i++) {
                formData.append('files', this.selectedFiles[i]);
            }
            formData.append('title', this.blogForm.value.title);
            formData.append('description', this.blogForm.value.description);

            this.fileService.upload(formData).subscribe(
                (event) => {
                    if (event.type === 4) {
                        this.successMessage = 'Blog créé avec succès!';
                        this.router.navigate(['/blog']);
                    }
                },
                (error) => {
                    console.error('Erreur lors de l\'appel API :', error);
                }
            );
        }
    }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
}
