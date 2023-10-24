import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private ws: any;
    private notificationsSubject: Subject<string> = new Subject<string>();
    private userId: string;


    connect(userId: string) {
        this.userId = userId;
        const socket = new WebSocket('ws://localhost:8094/notification');
        this.ws = Stomp.over(socket);
        this.ws.connect({
            userId: userId
        }, () => {
            this.ws.subscribe('/notification', (notification) => {
                this.notificationsSubject.next(JSON.parse(notification.body));
                console.log("recived")
            });
        });
    }

    subscribeTonotificationsSubject(): Observable<string> {
        return this.notificationsSubject.asObservable();
    }


}
