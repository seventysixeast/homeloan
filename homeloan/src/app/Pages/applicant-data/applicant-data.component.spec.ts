import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantDataComponent } from './applicant-data.component';

describe('ApplicantDataComponent', () => {
  let component: ApplicantDataComponent;
  let fixture: ComponentFixture<ApplicantDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
