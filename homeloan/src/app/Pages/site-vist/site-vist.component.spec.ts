import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteVistComponent } from './site-vist.component';

describe('SiteVistComponent', () => {
  let component: SiteVistComponent;
  let fixture: ComponentFixture<SiteVistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteVistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteVistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
