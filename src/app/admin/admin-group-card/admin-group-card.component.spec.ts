import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupCardComponent } from './admin-group-card.component';

describe('AdminGroupCardComponent', () => {
  let component: AdminGroupCardComponent;
  let fixture: ComponentFixture<AdminGroupCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGroupCardComponent]
    });
    fixture = TestBed.createComponent(AdminGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
