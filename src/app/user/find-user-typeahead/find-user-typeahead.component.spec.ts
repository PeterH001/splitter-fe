import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindUserTypeaheadComponent } from './find-user-typeahead.component';

describe('FindUserTypeaheadComponent', () => {
  let component: FindUserTypeaheadComponent;
  let fixture: ComponentFixture<FindUserTypeaheadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindUserTypeaheadComponent]
    });
    fixture = TestBed.createComponent(FindUserTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
