import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDto} from '../models/UserDto';
import {KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
    url = 'http://localhost:8092/api/user';


  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

    private getAuthHeaders(): HttpHeaders {
        const token = this.keycloakService.getKeycloakInstance().token;
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getProfile(): Observable<UserDto> {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.get<UserDto>(this.url + '/profile/getUserProfile', { headers });
    }

    updateProfile(user: UserDto) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.post(`${this.url}/profile/updateProfile`, user, {headers});
    }

    changePassword( newPwd: string): Observable<any> {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.post<any>(this.url  + '/profile/updatePassword', null,
            { headers, params: {  newPwd }});
    }

    registration(user: UserDto) {
      console.log (user);
        return this.http.post(`${this.url}/visitor/register`, user);

    }


}
