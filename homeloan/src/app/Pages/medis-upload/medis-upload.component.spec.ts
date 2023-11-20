import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedisUploadComponent } from './medis-upload.component';

describe('MedisUploadComponent', () => {
  let component: MedisUploadComponent;
  let fixture: ComponentFixture<MedisUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedisUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedisUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
