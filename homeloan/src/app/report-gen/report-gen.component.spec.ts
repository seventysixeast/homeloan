import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGenComponent } from './report-gen.component';

describe('ReportGenComponent', () => {
  let component: ReportGenComponent;
  let fixture: ComponentFixture<ReportGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportGenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
