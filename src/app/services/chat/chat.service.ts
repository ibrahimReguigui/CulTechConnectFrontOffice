import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {KeycloakService} from 'keycloak-angular';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {Message} from '../../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    url = 'http://localhost:8090/chat';


    constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

    private getAuthHeaders(): HttpHeaders {
        const token = this.keycloakService.getKeycloakInstance().token;
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    setMessageSeen(id:number) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.post(this.url + '/setMessageSeen', null,
            { headers, params: {  id }});
    }

    getConnectedUsers(): Observable<string[]> {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.get<string[]>(this.url2 + '/getConnectedUsers', { headers });
    }
    getAllMyMessage(): Observable<Message[]> {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.get<Message[]>('http://localhost:8091/chat/getAllMyMessage', { headers });
    }
    url2='http://localhost:8091/chat';
}
