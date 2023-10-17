import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../../' ;

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizUrl = 'api/quiz';
  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.quizUrl);
  }
}
