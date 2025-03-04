import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsupportComponent } from './itsupport.component';

describe('ItsupportComponent', () => {
  let component: ItsupportComponent;
  let fixture: ComponentFixture<ItsupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItsupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
