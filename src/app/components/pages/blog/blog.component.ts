import { Component, OnInit } from '@angular/core';
import {BlogServiceService} from '../../services/blog-service.service';
import {Router} from '@angular/router';
import {BlogForm} from '../../models/BlogForm';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
    blogs: BlogForm[] = [];
  constructor(private blogService: BlogServiceService,
              private router: Router) { }

  ngOnInit(): void {
      this.blogService.getAllBlogs().subscribe((data) => {
          this.blogs = data;
      });
  }
    onCreateBlogClick(): void {
        this.router.navigate(['/create-blog']);
    }

}
