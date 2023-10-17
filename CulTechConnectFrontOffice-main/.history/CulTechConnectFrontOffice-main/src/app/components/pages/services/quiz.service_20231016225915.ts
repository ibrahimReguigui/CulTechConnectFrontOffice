import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
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
        text: 'What is the traditional Japanese art of folding paper into various shapes and designs?',
        choices: ['Origami', 'Sumi-e', 'Ikebana', 'Taiko'],
        correctAnswerIndex: 0
      },
      {
        text: 'Which country is famous for its colorful Diwali festival of lights?',
        choices: ['India', 'China', 'Mexico', 'Egypt'],
        correctAnswerIndex: 0
      },
      text: 'In Greek mythology, who is the king of the gods?',
      choices: ['Poseidon', 'Hermes', 'Zeus', 'Hades'],
      correctAnswerIndex: 2
    ]);
  }

}
