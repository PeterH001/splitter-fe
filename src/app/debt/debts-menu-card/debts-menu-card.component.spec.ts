import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsMenuCardComponent } from './debts-menu-card.component';

describe('DebtsMenuCardComponent', () => {
  let component: DebtsMenuCardComponent;
  let fixture: ComponentFixture<DebtsMenuCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebtsMenuCardComponent]
    });
    fixture = TestBed.createComponent(DebtsMenuCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
