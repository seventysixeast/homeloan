import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorData2Component } from './guarantor-data2.component';

describe('GuarantorData2Component', () => {
  let component: GuarantorData2Component;
  let fixture: ComponentFixture<GuarantorData2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuarantorData2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuarantorData2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
