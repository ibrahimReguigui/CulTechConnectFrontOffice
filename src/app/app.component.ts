import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart, NavigationCancel, NavigationEnd} from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {filter} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Message} from './models/message';
import {Stomp} from '@stomp/stompjs';
import {Notification} from './models/notification';
import {KeycloakService} from 'keycloak-angular';
import {WebSocketService} from './services/chat/webSocket.service';
import {ChatService} from './services/chat/chat.service';
import {GlobalVarService} from './services/global-var.service';

declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent implements OnInit {
    location: any;
    routerSubscription: any;
    testvar=5;
    private userId: string;
/*
    private ws1: any;
    private ws2: any;
    private notificationSubject: Subject<Notification> = new Subject<Notification>();
    private messagesNotificationSubject: Subject<string> = new Subject<string>();

    private messagesNotifNbr: string;
    private notification: Notification[];

    connect(userId: string) {
        this.userId = userId;
        const socket1 = new WebSocket('ws://localhost:8093/notification');
        const socket2 = new WebSocket('ws://localhost:8091/chat');
        this.ws1 = Stomp.over(socket1);
        this.ws2 = Stomp.over(socket2);
        console.log(this.userId)
        this.ws2.connect({
            userId: userId // Pass the user ID as a connection header
        }, () => {
            this.ws2.subscribe('/message/notification/' + this.userId, (message) => {
                this.messagesNotificationSubject.next(JSON.parse(message.body));
            });
            this.ws1.subscribe('/notification/notification/' + this.userId, (message) => {
                this.notificationSubject.next(JSON.parse(message.body));
            });
        });
    }

    subscribeToMessagesNotificationSubject(): Observable<string> {
        return this.messagesNotificationSubject.asObservable();
    }

    subscribeToNotificationSubject(): Observable<Notification> {
        return this.notificationSubject.asObservable();
    }
*/

    constructor(private router: Router, private keycloak: KeycloakService,
                private webSocketService: WebSocketService,private chatService:ChatService,
                private globalVarService:GlobalVarService) {

    }
    unseenMessageNumber:any;
    ngOnInit() {
        this.keycloak.isLoggedIn().then(r=>{
            if (r==true){
                this.keycloak.loadUserProfile().then((userProfile) => {
                    this.userId=userProfile.id
                    this.webSocketService.connect(userProfile.id);
                })
                this.chatService.getAllMyMessage().subscribe(res => {
                    console.log(res)
                    this.unseenMessageNumber = res.filter(e => e.recipient == this.userId &&
                        e.seen == false).length;
                    console.log(this.unseenMessageNumber)
                    this.globalVarService.nbrMessageUnseen$.next(this.unseenMessageNumber)
                });
                this.webSocketService.subscribeToMessages().subscribe(() => {
                    this.chatService.getAllMyMessage().subscribe(res => {
                        console.log(res)
                        this.unseenMessageNumber = res.filter(e => e.recipient == this.userId &&
                            e.seen == false).length;
                        console.log(this.unseenMessageNumber)
                        this.globalVarService.nbrMessageUnseen$.next(this.unseenMessageNumber)
                    });
                });
            }
        });

        this.recallJsFuntions();
    }

    recallJsFuntions() {
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    $('.preloader').fadeIn('slow');
                }
            });
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
            .subscribe(event => {
                $.getScript('../assets/js/custom.js');
                $('.preloader').fadeOut('slow');
                this.location = this.router.url;
                if (!(event instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0);
            });
    }
}
