import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseMenuCardComponent } from './expense-menu-card.component';

describe('ExpenseMenuCardComponent', () => {
  let component: ExpenseMenuCardComponent;
  let fixture: ComponentFixture<ExpenseMenuCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseMenuCardComponent]
    });
    fixture = TestBed.createComponent(ExpenseMenuCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
