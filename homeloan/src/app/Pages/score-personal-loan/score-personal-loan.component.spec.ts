import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorePersonalLoanComponent } from './score-personal-loan.component';

describe('ScorePersonalLoanComponent', () => {
  let component: ScorePersonalLoanComponent;
  let fixture: ComponentFixture<ScorePersonalLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorePersonalLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScorePersonalLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
