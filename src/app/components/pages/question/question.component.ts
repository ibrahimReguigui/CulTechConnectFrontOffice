import { Component, OnInit,Input, Output, EventEmitter  } from '@angular/core';
import { Question } from '../../models/Question';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() userAnswer: number; 
  @Output() answerSelected = new EventEmitter<number>();

  onAnswerSelected(answerIndex: number): void {
   
    this.answerSelected.emit(answerIndex);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
