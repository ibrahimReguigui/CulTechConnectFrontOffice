import { Component, OnInit } from '@angular/core';
import {BlogServiceService} from '../../services/blog-service.service';
import {Router} from '@angular/router';
import {BlogForm} from '../../models/BlogForm';
import {FileServiceService} from '../../services/file-service.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
    blogs: BlogForm[] = [];
    images: SafeUrl[] = [];
  constructor(private fileService: FileServiceService,
              private router: Router) { }

  ngOnInit(): void {
      this.fileService.getBlogs().subscribe((data: BlogForm[]) => {
          this.blogs = data;
          console.log(data);
          console.log(typeof(data[0].image));
          this.images = this.blogs.map(blog => this.arrayBufferToBase64(blog.image));
      });


  }
    onCreateBlogClick(): void {
        this.router.navigate(['/create-blog']);
    }

    arrayBufferToBase64(image: string): string {
        return 'data:image/jpeg;base64,' + image;
    }



}
