import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Question } from '../../models/Question' ;

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizUrl = 'api/quiz';
  constructor(private http: HttpClient) { }

  /* getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.quizUrl);
  } */

  getQuestions(): Observable<any[]> {
    return of([
      {
        text: 'What is the capital of France?',
        choices: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswerIndex: 0
      },
      {
        text: 'Which planet is known as the Red Planet?',
        choices: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        correctAnswerIndex: 0
      },
      // Add more questions here...
    ]);
  }

}
