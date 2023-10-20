import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/Event';
@Component({
  selector: 'app-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss']
})
export class CaseStudyComponent implements OnInit {
  events: any[];
  event : Event=new Event();

  constructor(private eventService: EventService) { }

  ngOnInit(): void {

    
    this.eventService.getAllEvents().subscribe((events: Event[]) => {
      this.events=events;
      console.log(this.events); 
    });

  }

}
