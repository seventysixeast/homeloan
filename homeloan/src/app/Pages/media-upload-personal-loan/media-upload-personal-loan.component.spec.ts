import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaUploadPersonalLoanComponent } from './media-upload-personal-loan.component';

describe('MediaUploadPersonalLoanComponent', () => {
  let component: MediaUploadPersonalLoanComponent;
  let fixture: ComponentFixture<MediaUploadPersonalLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaUploadPersonalLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaUploadPersonalLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
