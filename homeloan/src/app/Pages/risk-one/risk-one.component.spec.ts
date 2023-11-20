import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskOneComponent } from './risk-one.component';

describe('RiskOneComponent', () => {
  let component: RiskOneComponent;
  let fixture: ComponentFixture<RiskOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
