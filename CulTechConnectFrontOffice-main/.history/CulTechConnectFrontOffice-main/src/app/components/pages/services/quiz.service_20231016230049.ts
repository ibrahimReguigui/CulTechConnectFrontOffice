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
      {
        text: 'In Greek mythology, who is the king of the gods?',
        choices: ['Poseidon', 'Hermes', 'Zeus', 'Hades'],
        correctAnswerIndex: 2
      },
      {
        text: 'The Eiffel Tower is located in which city?',
        choices: ['Berlin', 'London', 'Paris', 'Rome'],
        correctAnswerIndex: 2
      },
      {
        text: 'What type of traditional music is often associated with the country of flamenco and bullfighting?',
        choices: ['Samba', 'Reggae', ,'Flamenco' ],
        correctAnswerIndex: 2
      },
      {
        text: 'In which country can you find the historic city of Petra, known for its rock-cut architecture?',
        choices: ['Egypt', 'Greece', 'Jordan', 'Turkey'],
        correctAnswerIndex: 2
      },
      {
        text: 'Who is considered the national hero and founding father of the Philippines?',
        choices: ['Jose Rizal', 'Ferdinand Marcos', 'Emilio Aguinaldo', 'Andres Bonifacio'],
        correctAnswerIndex: 0
      },
      {
        text: 'The traditional Chinese philosophy of balancing energies and achieving harmony is known as what?',
        choices: ['Feng Shui', 'Confucianism', 'Taoism', 'Zen Buddhism'],
        correctAnswerIndex: 0
      },
      {
        text: 'Which country is famous for the Great Barrier Reef, the world\'s largest coral reef system?',
        choices: ['Brazil', 'Australia', 'Maldives', 'Philippines'],
        correctAnswerIndex: 1
      },
      {
        text: 'In Mexican cuisine, what is the name of the traditional dish made from corn dough filled with various ingredients and folded into a tortilla shape?',
        choices: ['Tacos', 'Chiles en Nogada', 'Quesadillas', 'Tamales'],
        correctAnswerIndex: 3
      }
    ]);
  }

}
