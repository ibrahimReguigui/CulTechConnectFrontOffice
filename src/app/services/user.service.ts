import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {KeycloakService} from 'keycloak-angular';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    url = 'http://localhost:8092/api/user';

    constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

    private getAuthHeaders(): HttpHeaders {
        const token = this.keycloakService.getKeycloakInstance().token;
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    getProfile(): Observable<UserModel> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.get<UserModel>(this.url + '/profile/getUserProfile', { headers });
    }
    getAllUser(): Observable<UserModel[]> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.get<UserModel[]>(this.url + '/getAllUser', { headers });
    }
}
