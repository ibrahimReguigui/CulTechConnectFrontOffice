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
        text: 'What type of traditional music is often associated with the country of flamenco and bullfighting?',
        choices: ['Samba', 'Reggae', 'Hip-hop' ,'Flamenco' ],
        correctAnswerIndex: 3
      },
      {
        text: 'In which country can you find the historic city of Petra, known for its rock-cut architecture?',
        choices: ['Egypt', 'Greece', 'Jordan', 'Turkey'],
        correctAnswerIndex: 2
      },

      {
        text: 'Which famous North African desert, covering parts of Tunisia, is known for its stunning landscapes, sand dunes, and unique Berber culture?',
        choices: ['Sahara Desert', 'Gobi Desert', 'Arabian Desert', 'Mojave Desert'],
        correctAnswerIndex: 0
      },
  
      {
        text: 'In Mexican cuisine, what is the name of the traditional dish made from corn dough filled with various ingredients and folded into a tortilla shape?',
        choices: ['Tacos', 'Chiles en Nogada', 'Quesadillas', 'Tamales'],
        correctAnswerIndex: 3
      },
      {
        
          text: 'Which African country is known for being home to the mountain gorillas??',
          choices: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda'],
          correctAnswerIndex: 3
        
      },

      {
        text: "What is the national sport of India?",
        choices: ["Cricket", "Soccer", "Basketball", "Tennis"],
        correctAnswerIndex: 0
      },
      
      {
        text: "What is the traditional greeting in Japan?",
        choices: ["Hola", "Namaste", "Konnichiwa", "Bonjour"],
        correctAnswerIndex: 2
      }

    ]);
  }

}
