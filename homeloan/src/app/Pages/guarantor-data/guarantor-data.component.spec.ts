import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorDataComponent } from './guarantor-data.component';

describe('GuarantorDataComponent', () => {
  let component: GuarantorDataComponent;
  let fixture: ComponentFixture<GuarantorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuarantorDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuarantorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
