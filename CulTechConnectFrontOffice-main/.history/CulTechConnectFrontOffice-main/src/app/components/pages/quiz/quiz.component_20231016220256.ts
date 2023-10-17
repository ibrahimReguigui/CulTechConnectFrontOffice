import { Component, OnInit } from '@angular/core';
import {question} from '../'
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  currentQuestionIndex: number = 0;
  userAnswers: Map<number, number> = new Map(); // Map of question index to selected answer index
  score: number = 0;
  questions: question[] = [];

  constructor() { private quizService: QuizService }

  ngOnInit(): void {
    this.loadQuestions();
  }
  loadQuestions(): void {
    this.quizService.getQuestions().subscribe((data: Question[]) => {
      this.questions = data;
    });
  }

  selectAnswer(questionIndex: number, answerIndex: number): void {
    this.userAnswers.set(questionIndex, answerIndex);
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      // The user has completed the quiz; calculate the score and navigate to results page
      this.calculateScore();
      // Implement navigation logic here
    }
  }

  //calculateScore(): void {
    // Calculate the score based on user answers and update the 'score' variable
    // You can add your scoring logic here
//  }
}
