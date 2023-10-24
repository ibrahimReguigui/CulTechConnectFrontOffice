import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() showDialog: boolean;
  @Output() okClicked: EventEmitter<void> = new EventEmitter();


  closeDialogAndMoveToNextQuestion(): void {
    this.showDialog = false; 
    this.okClicked.emit();
  }


}
