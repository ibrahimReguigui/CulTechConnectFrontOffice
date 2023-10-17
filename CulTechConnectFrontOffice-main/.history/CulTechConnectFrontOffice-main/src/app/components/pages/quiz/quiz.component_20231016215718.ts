import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  currentQuestionIndex: number = 0;
  userAnswers: Map<number, number> = new Map(); // Map of question index to selected answer index
  score: number = 0;
  questions: Question[] = [];

  constructor() { private quizService: QuizService }

  ngOnInit(): void {
    this.loadQuestions();
  }

}
