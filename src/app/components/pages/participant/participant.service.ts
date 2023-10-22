import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from './participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private apiBaseUrl = 'http://localhost:8280/api/participants'; // Replace with your Spring Boot API URL

  constructor(private http: HttpClient) { }

  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.apiBaseUrl);
  }

  getParticipant(id: number): Observable<Participant> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.get<Participant>(url);
  }

  createParticipant(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.apiBaseUrl, participant);
  }

  updateParticipant(id: number, participant: Participant): Observable<Participant> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.put<Participant>(url, participant);
  }

  deleteParticipant(id: number): Observable<void> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
