import { Component, OnInit, OnDestroy , Renderer2, ElementRef } from '@angular/core';
//import {Question} from '../question/question.component';
import {QuizService} from '../../services/quiz.service';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit, OnDestroy {
  currentQuestionIndex: number = 0;
  userAnswer: number;
  score: number = 0;
  questions: any[] = [];
  timer: any;
  timerCountdown: number = 10;
  allQuestionsAnswered: boolean = false;
  showScore: boolean = false;
  questionAnswered: boolean = false;
  quizStarted: boolean = false;
  showDialog = false;


constructor(private quizService: QuizService,private renderer: Renderer2, private el: ElementRef) {  }

ngOnInit(): void {
    //this.loadQuestions();
    this.startTimer();
  }
  

ngOnDestroy(): void {
    clearInterval(this.timer); 
  }


startQuiz(): void {
    this.quizStarted = true;
    this.loadQuestions();
    this.startTimer();
  }

loadQuestions(): void {
  
      this.quizService.getQuestions().subscribe((data: any[]) => {
      this.questions = data;
      this.timerCountdown = 10; 
    });
  }

  selectAnswer( answerIndex: number, selectedIndex: number ): void {
    this.userAnswer = answerIndex;
    clearInterval(this.timer);

    if (answerIndex === this.questions[this.currentQuestionIndex].correctAnswerIndex) {
      this.score++;
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
          if (this.userAnswer === undefined) {
            this.openAnswerFasterDialog();
          } else {

          this.nextQuestion();}
        }
      }, 1000);
    }

    nextQuestion(): void {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.userAnswer = undefined;
        clearInterval(this.timer);
        this.timerCountdown = 10;
      } else {
        this.allQuestionsAnswered = true;
    
        if (this.userAnswer === undefined) {
         
          this.openAnswerFasterDialog();
        } else {
          this.showScore = true;
        }
      }
    }
   
    closeDialogAndMoveToNextQuestion(): void {
      this.showDialog = false; 
      this.nextQuestion(); 
    }

 openAnswerFasterDialog(): void {
    this.showDialog = true;
   
  }

    }


