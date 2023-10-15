import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
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

}
