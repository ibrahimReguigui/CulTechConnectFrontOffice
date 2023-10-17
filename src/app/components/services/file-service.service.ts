import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BlogForm} from '../models/BlogForm';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

    url = 'http://localhost:8093/';
  constructor(private http: HttpClient) { }

    upload(formData: FormData): Observable<HttpEvent<string[]>> {
        return this.http.post<string[]>(`${this.url}file/upload`, formData, {
            reportProgress: true,
            observe: 'events'
        });
    }

    getBlogs(): Observable<BlogForm[]> {
        return this.http.get<BlogForm[]>(`${this.url}file/blogs`);
    }

    updateBlogWithImage(blogId: number, formData: FormData, headers: HttpHeaders): Observable<any> {
        return this.http.put<any>(`${this.url}file/update/${blogId}`, formData, { headers });
    }
}
