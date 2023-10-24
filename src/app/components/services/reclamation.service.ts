import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReclamationComponent } from '../pages/reclamation/reclamation.component';
//import { MatDialog } from '@angular/material/';
import {Reclamation} from '../models/Reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8093/Reclamation';

  constructor(private http: HttpClient) { }

  getReclamations(): Observable<Reclamation[]> { 
    return this.http.get<Reclamation[]>(`${this.apiUrl}/retrieve-all-reclamations`); 
  }

  /* getReclamation(reclamationId: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.apiUrl}/retrieve-reclamation/${reclamationId}`);
  } */

  addReclamation(reclamationData: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.apiUrl}/add-reclamation`, reclamationData);
  }

  updateReclamation(reclamationData: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.apiUrl}/update-reclamation`, reclamationData);
  }

  deleteReclamation(reclamationId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete-reclamation/${reclamationId}`);
  }

}