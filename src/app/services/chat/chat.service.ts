import {Injectable, ViewChild} from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Message } from '../../models/message';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private ws: any;
    private messagesSubject: Subject<Message> = new Subject<Message>();
    private connectedUsersSubject: Subject<string[]> = new Subject<string[]>();
    private userId: string;

    connect(userId: string) {
        this.userId = userId;
        const socket = new WebSocket('ws://localhost:8091/chat');
        this.ws = Stomp.over(socket);
        this.ws.connect({
            userId: userId // Pass the user ID as a connection header
        }, () => {
            this.ws.subscribe('/message', (message) => {
                this.messagesSubject.next(JSON.parse(message.body));
            });

            // Subscribe to the list of connected users
            this.ws.subscribe('/connected-users', (users) => {
                this.connectedUsersSubject.next(JSON.parse(users.body));
            });
            this.ws.subscribe('/message/'+this.userId, (message) => {
                this.messagesSubject.next(JSON.parse(message.body));
            });
        });
    }

    subscribeToMessages(): Observable<Message> {
        return this.messagesSubject.asObservable();
    }

    subscribeToConnectedUsers(): Observable<string[]> {
        return this.connectedUsersSubject.asObservable();
    }

    sendMessage(message: Message) {
        this.ws.send('/app/chat', {}, JSON.stringify(message));
    }
}
