import {Component, Input, OnInit} from '@angular/core';
import {BattleService} from '../../logic/battle/battle.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css'],
})
export class StatusBarComponent implements OnInit {
  @Input('battleService') battleService: BattleService;

  constructor() { }

  ngOnInit(): void {
  }
}
