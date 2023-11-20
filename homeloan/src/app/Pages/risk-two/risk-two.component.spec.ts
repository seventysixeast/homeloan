import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskTwoComponent } from './risk-two.component';

describe('RiskTwoComponent', () => {
  let component: RiskTwoComponent;
  let fixture: ComponentFixture<RiskTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
