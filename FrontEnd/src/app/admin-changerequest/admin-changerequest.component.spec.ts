import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangerequestComponent } from './admin-changerequest.component';

describe('AdminChangerequestComponent', () => {
  let component: AdminChangerequestComponent;
  let fixture: ComponentFixture<AdminChangerequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminChangerequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminChangerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
