import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BlogForm} from '../models/BlogForm';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
    url = 'http://localhost:8093/';
  constructor(private http: HttpClient) { }

    createBlog(data: any): Observable<any> {
        return this.http.post(this.url + 'createBlog', data);
    }
    getAllBlogs(): Observable<BlogForm[]> {
        return this.http.get<BlogForm[]>(`${this.url}getAllBlog`);
    }

    getBlogById(blogId: number): Observable<BlogForm> {
        return this.http.get<BlogForm>(`${this.url}file/blogs/${blogId}`);
    }

    getBlogImage(blogId: number): Observable<any> {
        return this.http.get(`${this.url}/blogs/${blogId}/image`, { responseType: 'blob' });
    }
}
