import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleScreenComponent } from './battle-screen.component';
import {StatusBarComponent} from '../status-bar/status-bar.component';
import {PauseButtonComponent} from '../pause-button/pause-button.component';
import {LogService} from '../../logic/log/log.service';
import {ColoredLogDirective} from '../directive/coloredLog.directive';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
describe('BattleScreenComponent', () => {
  let component: BattleScreenComponent;
  let view;
  let fixture: ComponentFixture<BattleScreenComponent>;

  beforeEach(async(() => {
    const mockLog = {
      getLogs: jest.fn()
    }
    TestBed.configureTestingModule({
      declarations: [ BattleScreenComponent, StatusBarComponent, PauseButtonComponent, ColoredLogDirective ],
      providers: [ BattleScreenComponent,
        { provide: LogService, useValue: mockLog},
        { provide: Router },
        { provide: HttpClient },
        { provide: ActivatedRoute },
        { provide: BrowserAnimationsModule }
        ]
    })
    .compileComponents();
    TestBed.inject(LogService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleScreenComponent);
    component = fixture.debugElement.componentInstance;
    view = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create play/pause button', () => {
    console.log(component)
    expect(component).toBeTruthy();
  });
});
