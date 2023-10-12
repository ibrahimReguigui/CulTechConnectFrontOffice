import { Component, OnInit } from '@angular/core';
import {BlogServiceService} from '../../services/blog-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDto} from '../../models/UserDto';
import {BlogForm} from '../../models/BlogForm';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../services/auth-service.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
    userDto: UserDto;
    successMessage: string = '';
    currentDate: Date = new Date();
    blog: { title: string, content: string } = { title: '', content: '' };

    blogForm: FormGroup;
    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private blogService: BlogServiceService,
                private authService: AuthServiceService) {
        this.blogForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

  ngOnInit(): void {
      this.authService.getProfile().subscribe(res => {
          this.userDto=res
          console.log(this.userDto);
      });
  }
    onSubmit(): void {
        if (this.blogForm.valid) {
            const blogData = this.blogForm.value;
            this.blogService.createBlog(blogData).subscribe(
                (response) => {
                    console.log('Réponse de l\'API :', response);
                    this.successMessage = 'Blog créé avec succès!';
                    this.blogForm.reset();
                    this.router.navigate(['/blog']);
                },
                (error) => {
                    console.error('Erreur lors de l\'appel API :', error);
                }
            );
        } else {
            for (const controlName in this.blogForm.controls) {
                if (this.blogForm.controls.hasOwnProperty(controlName)) {
                    this.blogForm.get(controlName)?.markAsTouched();
                }
            }
        }
    }





}
