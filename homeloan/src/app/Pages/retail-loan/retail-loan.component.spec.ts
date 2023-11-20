import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailLoanComponent } from './retail-loan.component';

describe('RetailLoanComponent', () => {
  let component: RetailLoanComponent;
  let fixture: ComponentFixture<RetailLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
