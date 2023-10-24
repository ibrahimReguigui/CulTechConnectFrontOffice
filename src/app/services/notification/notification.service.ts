import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message} from '../../models/message';
import {Stomp} from '@stomp/stompjs/esm6';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private ws: any;
    private notificationsSubject: Subject<Message> = new Subject<Message>();
    private userId: string;

    connect(userId: string) {
        this.userId = userId;
        const socket = new WebSocket('ws://localhost:8093/notification');
        this.ws = Stomp.over(socket);
        this.ws.connect({
            userId: userId
        }, () => {
            this.ws.subscribe('/notification/'+this.userId, (notification) => {
                this.notificationsSubject.next(JSON.parse(notification.body));
            });
        });
    }

    subscribeToMessages(): Observable<Message> {
        return this.notificationsSubject.asObservable();
    }

}
