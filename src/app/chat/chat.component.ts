import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Stomp } from '@stomp/stompjs';
import { Message } from '../models/message';
import {ChatService} from '../services/chat/chat.service';
import {UserDto} from '../components/models/UserDto';
import {UserService} from '../services/user/user.service';
import {User} from '../models/user';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
    @ViewChild('chatContainer', { static: false }) private chatContainer: ElementRef;


    ws: any;
    userId: string;
    message: Message = new Message();
    messages: Message[] = [];
    connectedUsers: string[] = [];
    userList:User[]=[];

    constructor(private keycloak: KeycloakService, private chatService: ChatService,
                private userService:UserService) {}

    ngOnInit(): void {
        this.keycloak.loadUserProfile().then((userProfile) => {
            this.userId = userProfile.id;
            this.connect();
        });
        this.userService.getAllUser().subscribe(res=>{
            console.log(res)
            this.userList=res;
        })
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        } catch (err) {
            console.error('Error scrolling to bottom:', err);
        }
    }
    connect() {
        this.chatService.connect(this.userId);

        // Subscribe to messages
        this.chatService.subscribeToMessages().subscribe((message) => {
            this.messages.push(message);
        });

        // Subscribe to the list of connected users
        this.chatService.subscribeToConnectedUsers().subscribe((users) => {
            console.log(users)
            this.connectedUsers = users;
        });
    }

    sendMessage() {
        this.message.sender = this.userId;
        this.chatService.sendMessage(this.message);
        this.message.content = '';
    }

}
