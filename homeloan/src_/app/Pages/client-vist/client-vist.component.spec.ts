import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVistComponent } from './client-vist.component';

describe('ClientVistComponent', () => {
  let component: ClientVistComponent;
  let fixture: ComponentFixture<ClientVistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientVistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientVistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
