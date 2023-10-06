import {Role} from './role.enum';
import {AcountStatus} from './account-status.enum';

export class UserModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    image: string;
    phoneNumber: number;
    acountStatus: AcountStatus;
    societyName:string;
    adress:string;
    info:string;
}
