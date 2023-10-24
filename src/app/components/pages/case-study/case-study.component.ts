import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {EventService} from '../../../services/event.service';
@Component({
    selector: 'app-case-study',
    templateUrl: './case-study.component.html',
    styleUrls: ['./case-study.component.scss']
})
export class CaseStudyComponent implements OnInit {
    events: any[];
    @Output() itemSelected = new EventEmitter<any>();

    selectItem(item: any) {
        //  this.router.navigate(['/case-study-details/:idEvent']);
        // this.itemSelected.emit(item);

        data : item;
    }

    constructor(private eventService: EventService, private router: Router) { }

    ngOnInit(): void {


        this.eventService.getAllEvents().subscribe((events: Event[]) => {
            this.events=events;
            console.log(this.events);
        });

    }

}
