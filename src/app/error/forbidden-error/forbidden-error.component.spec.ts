import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenErrorComponent } from './forbidden-error.component';

describe('ForbiddenErrorComponent', () => {
  let component: ForbiddenErrorComponent;
  let fixture: ComponentFixture<ForbiddenErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForbiddenErrorComponent]
    });
    fixture = TestBed.createComponent(ForbiddenErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
