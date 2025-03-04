import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewincidentsComponent } from './viewincidents.component';

describe('ViewincidentsComponent', () => {
  let component: ViewincidentsComponent;
  let fixture: ComponentFixture<ViewincidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewincidentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewincidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
