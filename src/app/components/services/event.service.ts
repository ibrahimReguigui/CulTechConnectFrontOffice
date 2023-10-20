import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8097';
  constructor(private http: HttpClient) { }

  addEvent(event: any) {
    return this.http.post(`${this.baseUrl}/add-Event`, event);
  }

  deleteEvent(idEvent: number) {
    return this.http.delete(`${this.baseUrl}/deleteEvent/${idEvent}`);
  }

  updateEvent(idEvent: number, event: any) {
    return this.http.put(`${this.baseUrl}/updateEvent/${idEvent}`, event);
  }

  getAllEvents() {
    return this.http.get<any[]>(`${this.baseUrl}/getAllEvents`);
  }
  getEventDetails(idEvent: number) {
    const url = `${this.baseUrl}/case-study-details/${idEvent}`;
    return this.http.get(url);
  }

}
