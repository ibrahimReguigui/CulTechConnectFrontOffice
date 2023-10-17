import { Component, OnInit, OnDestroy  } from '@angular/core';
//import {Question} from '../question/question.component';
import {QuizService} from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit, OnDestroy {
  currentQuestionIndex: number = 0;
  userAnswer: number;
 // userAnswers: Map<number, number> = new Map(); 
  score: number = 0;
  questions: any[] = [];
  timer: any;
  timerCountdown: number = 10;
  allQuestionsAnswered: boolean = false;
  showScore: boolean = false;
 // questions: Question[] = [];

constructor(private quizService: QuizService) {  }

ngOnInit(): void {
    this.loadQuestions();
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer); // Clear the timer when the component is destroyed
  }

loadQuestions(): void {
    //this.quizService.getQuestions().subscribe((data: Question[]) => {
      //this.questions = data;
    //});
    this.quizService.getQuestions().subscribe((data: any[]) => {
      this.questions = data;
      this.timerCountdown = 10; // Reset the timer countdown when loading a new question
      this.startTimer(); 
    });
  }

  selectAnswer( answerIndex: number): void {
    // if (answerIndex === this.questions[this.currentQuestionIndex].correctAnswerIndex) {
    //   this.score++;
    this.userAnswer = answerIndex;

    clearInterval(this.timer);

    if (answerIndex === this.questions[this.currentQuestionIndex].correctAnswerIndex) {
      this.score++; // Increment the score for correct answers
    }
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.allQuestionsAnswered = true;
    }
    setTimeout(() => {
      this.nextQuestion();
    }, 1000);
    }

    startTimer(): void {
      this.timer = setInterval(() => {
        if (this.timerCountdown > 0) {
          this.timerCountdown--;
        } else {
          clearInterval(this.timer);
          this.nextQuestion();
          // Handle the case when the timer reaches 0 seconds (e.g., move to the next question)
        }
      }, 1000);
    }

   // this.userAnswers.set(questionIndex, answerIndex);
 // }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.userAnswer = undefined;
      clearInterval(this.timer);
      this.timerCountdown = 10;
      this.startTimer();
    }
      else {
        this.allQuestionsAnswered = true; 
        
      }
      // Quiz completed; you can display results or navigate to a results page
    }
   // if (this.currentQuestionIndex < this.questions.length - 1) {
     // this.currentQuestionIndex++;
    //} else {
      // The user has completed the quiz; calculate the score and navigate to results page
     // this.calculateScore();
      // Implement navigation logic here
    }


  //calculateScore(): void {
    // Calculate the score based on user answers and update the 'score' variable
    // You can add your scoring logic here

