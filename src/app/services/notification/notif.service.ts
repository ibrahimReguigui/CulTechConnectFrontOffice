import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';
import {Notification} from '../../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

    url = 'http://localhost:8090/notification';


    constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

    private getAuthHeaders(): HttpHeaders {
        const token = this.keycloakService.getKeycloakInstance().token;
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getAllMyMessage(): Observable<Notification[]> {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.get<Notification[]>(this.url + '/getMyNotification', { headers });
    }
}
