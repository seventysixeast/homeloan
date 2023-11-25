import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UFilesComponent } from './u-files.component';

describe('UFilesComponent', () => {
  let component: UFilesComponent;
  let fixture: ComponentFixture<UFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
