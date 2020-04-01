import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pause-button',
  templateUrl: './pause-button.component.html',
  styleUrls: ['./pause-button.component.css']
})
export class PauseButtonComponent {
  @Input('isPaused') isPaused = true;
  @Output('pause') onPause = new EventEmitter<boolean>();

  handleClick(): void {
    this.onPause.emit(!this.isPaused);
  }
}
