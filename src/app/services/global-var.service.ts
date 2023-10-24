import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService implements OnInit{
    nbrMessageUnseen$ = new Subject<any>();
    nbrNotificationUnseen$ = new Subject<any>();
     currentNbrMessageUnseen: any;
     currentNbrNotificationUnseen: any;

    constructor() {
    }

    ngOnInit(): void {
        this.nbrMessageUnseen$.subscribe(e=>this.currentNbrMessageUnseen=e)
    }

}
