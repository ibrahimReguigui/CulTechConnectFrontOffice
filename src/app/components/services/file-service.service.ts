import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {BlogForm} from '../models/BlogForm';
import {KeycloakService} from 'keycloak-angular';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

    url = 'http://localhost:8093/';
  constructor(private http: HttpClient,
              private keycloakService: KeycloakService) { }

    private getAuthHeaders(): HttpHeaders {
        const token = this.keycloakService.getKeycloakInstance().token;
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    upload(formData: FormData): Observable<HttpEvent<string[]>> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
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
