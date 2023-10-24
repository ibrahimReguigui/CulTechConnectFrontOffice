import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../../../services/blog-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../../../models/UserDto';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';
import { FileServiceService } from '../../../services/file-service.service';
import {BlogForm} from '../../../models/BlogForm';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-update-blog',
    templateUrl: './update-blog.component.html',
    styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent implements OnInit {

    userDto: UserDto = new UserDto();
    successMessage = '';
    currentDate: Date = new Date();
    blogForm!: FormGroup;
    selectedFiles: FileList | null = null;
    blogId = 0;
    images = '';
    blog: BlogForm = {
        id: 0,
        title: '',
        description: '',
        createdOn: new Date(),
        isPublished: false,
        image: ''
    };
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private blogService: BlogServiceService,
        private authService: AuthServiceService,
        private fileService: FileServiceService,
        private route: ActivatedRoute
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

        this.route.paramMap.subscribe(params => {
            this.blogId = Number(params.get('blogId'));
            this.getBlogDetails(this.blogId);
        });
    }
    getBlogDetails(blogId: number): void {
        this.blogService.getBlogById(blogId).subscribe(
            (data: BlogForm) => {
                this.blog = data;
                this.images = this.arrayBufferToBase64(this.blog.image);
                this.blogForm.patchValue({
                    title: this.blog.title,
                    description: this.blog.description
                });
            },
            error => {
                console.error('Une erreur s\'est produite lors de la récupération des détails du blog.', error);
            }
        );
    }

    arrayBufferToBase64(image: string): string {
        return 'data:image/jpeg;base64,' + image;
    }

    onSubmit(): void {
        if (this.selectedFiles) {
            const formData = new FormData();
            formData.append('title', this.blogForm.value.title);
            formData.append('description', this.blogForm.value.description);
            formData.append('file', this.selectedFiles[0], this.selectedFiles[0].name);

            this.fileService.updateBlogWithImage(this.blogId, formData, new HttpHeaders())
                .subscribe(
                    (response: any) => {
                        console.log('La réponse de la mise à jour du blog est :', response);
                        this.successMessage = 'Le blog a été mis à jour avec succès!';
                        this.router.navigate(['/blog']);
                    },
                    (error: any) => {
                        console.error('Une erreur s\'est produite lors de la mise à jour du blog :', error);
                    }
                );
        }
    }



    ileForUpdate(event: any): void {
        this.selectedFiles = event.target.files;
    }

    onFileChanged(event: any): void {
        this.selectedFiles = event.target.files;
        console.log(this.selectedFiles);
    }
}
