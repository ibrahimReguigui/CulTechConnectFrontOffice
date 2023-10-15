import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../../services/blog-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../../models/UserDto';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FileServiceService } from '../../services/file-service.service';

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
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private blogService: BlogServiceService,
        private authService: AuthServiceService,
        private fileService: FileServiceService
    ) {
        this.blogForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.authService.getProfile().subscribe(res => {
            this.userDto = res;
            console.log(this.userDto);
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
