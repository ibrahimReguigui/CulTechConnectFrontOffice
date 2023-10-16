import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {Stomp} from '@stomp/stompjs';
import {Message} from '../models/message';
import {WebSocketService} from '../services/chat/webSocket.service';
import {UserDto} from '../components/models/UserDto';
import {UserService} from '../services/user/user.service';
import {User} from '../models/user';
import {ChatService} from '../services/chat/chat.service';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';
import {KeycloakProfile} from 'keycloak-js';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
    @ViewChild('chatContainer', {static: false}) private chatContainer: ElementRef;


    ws: any;
    userId: string;
    message: Message = new Message();
    messages: Message[] = [];
    interlocuteurMessages: Message[] = [];
    connectedUsers: string[] = [];
    userList: User[] = [];
    interlocuteur: User;
    unseenMessageNumber: number = 0;
    loggedInUser: KeycloakProfile;
    searchInput: string = '';

    constructor(private keycloak: KeycloakService, private webSocketService: WebSocketService,
                private userService: UserService, private chatService: ChatService,) {
    }

    ngOnInit(): void {
        this.keycloak.loadUserProfile().then((userProfile) => {
            this.userId = userProfile.id;
            this.loggedInUser = userProfile;
            this.connect();
        });
        this.userService.getAllUser().subscribe(res => {
            this.userList = res;
            this.chatService.getAllMyMessage().subscribe(res => {
                this.messages = res;
                this.unseenMessageNumber = this.messages.filter(e => e.recipient == this.userId &&
                    e.seen == false).length;
                this.updateUnreadMessagesAndLastMessage();
            });
        });


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
        this.webSocketService.connect(this.userId);

        // Subscribe to messages
        this.webSocketService.subscribeToMessages().subscribe((message) => {
            this.messages.push(message);
            if (this.interlocuteur != null) {
                this.chatWithInterlocuterur(this.interlocuteur);
            }
            this.updateUnreadMessagesAndLastMessage();
        });

        // Subscribe to the list of connected users
        this.webSocketService.subscribeToConnectedUsers().subscribe((users) => {
            console.log(users);
            this.connectedUsers = users;
        });
    }

    sendMessage() {
        this.message.sender = this.userId;
        this.message.recipient = this.interlocuteur.id;
        this.webSocketService.sendMessage(this.message);
        this.message.content = '';
    }

    chatWithInterlocuterur(user: User) {
        this.interlocuteur = user;
        this.interlocuteurMessages = this.messages.filter(e => e.recipient == this.interlocuteur.id ||
            e.sender == this.interlocuteur.id);
        this.interlocuteurMessages.filter(e => e.recipient == this.userId).map(e => {
            e.seen = true;
            this.chatService.setMessageSeen(e.id).subscribe();
        });

        this.updateUnreadMessagesAndLastMessage();
    }


    updateUnreadMessagesAndLastMessage(): void {
        this.unseenMessageNumber = 0;
        this.userList.map(user => {
            user.unreadMessages = this.messages.filter(
                message => message.sender === user.id && !message.seen
            ).length;
            if (user.unreadMessages != 0) {
                user.lastMessager = this.messages
                    .filter(message => message.sender === user.id)
                    .pop();
                this.unseenMessageNumber += user.unreadMessages;
            }
        })
    }

}
