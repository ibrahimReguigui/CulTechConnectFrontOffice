import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../services/quiz.service;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: './quiz.component.scss',
})
export class QuizComponent implements OnInit, OnDestroy {
  currentQuestionIndex: number = 0;
  userAnswer: number;
  score: number = 0;
  questions: any[] = [];
  quizStarted: boolean = false;
  timer: any;
  timerCountdown: number = 10;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    // Initialize the timerCountdown when the component loads
    this.timerCountdown = 10;
  }

  ngOnDestroy(): void {
    clearInterval(this.timer); // Clear the timer when the component is destroyed
  }

  loadQuestions(): void {
    this.quizService.getQuestions().subscribe((data: any[]) => {
      this.questions = data;
      this.startTimer();
    });
  }

  selectAnswer(answerIndex: number): void {
    this.userAnswer = answerIndex;

    // Clear the timer and handle next question logic
    clearInterval(this.timer);

    setTimeout(() => {
      this.nextQuestion();
    }, 1000);

    if (answerIndex === this.questions[this.currentQuestionIndex].correctAnswerIndex) {
      this.score++; // Increment the score for correct answers
    }
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      if (this.timerCountdown > 0) {
        this.timerCountdown--; // Decrement by 1 second
      } else {
        clearInterval(this.timer);
        this.nextQuestion();
        // Handle the case when the timer reaches 0 seconds (e.g., move to the next question)
      }
    }, 1000); // Use 1000 milliseconds (1 second) interval
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.userAnswer = undefined;
      this.timerCountdown = 10; // Reset the timer countdown for the next question
      this.startTimer(); // Start the timer for the next question
    } else {
      clearInterval(this.timer);
      // Quiz completed; you can display results or navigate to a results page
    }
  }
}
