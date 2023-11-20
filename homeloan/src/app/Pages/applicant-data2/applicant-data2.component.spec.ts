import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantData2Component } from './applicant-data2.component';

describe('ApplicantData2Component', () => {
  let component: ApplicantData2Component;
  let fixture: ComponentFixture<ApplicantData2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantData2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantData2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
