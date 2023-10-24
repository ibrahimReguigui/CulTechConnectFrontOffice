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
import {NotificationService} from './services/notification/notification.service';
import {NotifService} from './services/notification/notif.service';

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
    private userId: string;


    constructor(private router: Router, private keycloak: KeycloakService,
                private webSocketService: WebSocketService,private chatService:ChatService,
                private globalVarService:GlobalVarService,private notificationService:NotificationService,
                private notifService:NotifService) {

    }
    unseenMessageNumber:any;
    nbrNotif:any;
    ngOnInit() {
        this.keycloak.isLoggedIn().then(r=>{
            if (r==true){

                this.keycloak.loadUserProfile().then((userProfile) => {
                    this.userId=userProfile.id
                    this.webSocketService.connect(userProfile.id);
                    this.notificationService.connect(userProfile.id);
                })

                this.chatService.getAllMyMessage().subscribe(res => {
                    this.unseenMessageNumber = res.filter(e => e.recipient == this.userId &&
                        e.seen == false).length;
                    this.globalVarService.nbrMessageUnseen$.next(this.unseenMessageNumber)
                });
                this.notifService.getAllMyMessage().subscribe(r=>
                {
                    this.nbrNotif=r.length
                    console.log(this.nbrNotif)
                    this.globalVarService.nbrMessageUnseen$.next(this.nbrNotif)
                })
                this.webSocketService.subscribeToMessages().subscribe(() => {
                    this.chatService.getAllMyMessage().subscribe(res => {
                        console.log(res)
                        this.unseenMessageNumber = res.filter(e => e.recipient == this.userId &&
                            e.seen == false).length;
                        this.globalVarService.nbrMessageUnseen$.next(this.unseenMessageNumber)
                    });
                });
                this.notificationService.subscribeTonotificationsSubject().subscribe(() => {
                    this.notifService.getAllMyMessage().subscribe(r=>
                    {
                        this.nbrNotif=r.filter(e => e.seen != true ).length
                        this.globalVarService.nbrNotificationUnseen$.next(this.nbrNotif)
                    })
                })

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
