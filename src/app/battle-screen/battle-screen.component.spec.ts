import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleScreenComponent } from './battle-screen.component';

describe('BattleScreenComponent', () => {
  let component: BattleScreenComponent;
  let fixture: ComponentFixture<BattleScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create play/pause button', () => {
    expect(component).toBeTruthy();
  });
});
