import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorData3Component } from './guarantor-data3.component';

describe('GuarantorData3Component', () => {
  let component: GuarantorData3Component;
  let fixture: ComponentFixture<GuarantorData3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuarantorData3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuarantorData3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
