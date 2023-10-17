import { Component, OnInit,Input, Output, EventEmitter  } from '@angular/core';
import { Question } from '../question/';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() userAnswer: number; // User's selected answer, if any
  @Output() answerSelected = new EventEmitter<number>();

  onAnswerSelected(answerIndex: number): void {
    // Emit the selected answer choice to the parent component
    this.answerSelected.emit(answerIndex);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
