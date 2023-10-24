import {Message} from './message';

export class User {
    id:string
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    image: string;
    phoneNumber: number;
    accountStatus: string;
    societyName:string;
    adress:string;
    info:string;
    unreadMessages:number;
    lastMessager:Message;
}
