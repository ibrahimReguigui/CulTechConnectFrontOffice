import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { question } from '../question/question.component' ;

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizUrl = 'api/quiz';
  constructor(private http: HttpClient) { }

  getQuestions(): Observable<question[]> {
    return this.http.get<question[]>(this.quizUrl);
  }
}
