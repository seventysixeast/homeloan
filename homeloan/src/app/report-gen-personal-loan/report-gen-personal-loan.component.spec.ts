import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGenPersonalLoanComponent } from './report-gen-personal-loan.component';

describe('ReportGenPersonalLoanComponent', () => {
  let component: ReportGenPersonalLoanComponent;
  let fixture: ComponentFixture<ReportGenPersonalLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportGenPersonalLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportGenPersonalLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
