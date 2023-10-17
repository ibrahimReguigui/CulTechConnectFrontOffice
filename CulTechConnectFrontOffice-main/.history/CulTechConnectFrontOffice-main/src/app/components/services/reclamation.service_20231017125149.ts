import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {rec}
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8093/cultechconnect/Reclamation/reclamation';

  constructor(private http: HttpClient) { }

  openDialog() {
    
    this.rec.open(DialogComponent, {
      width: '400px', 
     
    });
  }

  closeDialog() {
    console.log('Dialog closing.');
    this.dialog.closeAll();
  }
}

  submitReclamation(reclamationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reclamations`, reclamationData);
  }

  // Get a list of reclamation requests from the server
  getReclamationRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reclamations`);
  }

}
