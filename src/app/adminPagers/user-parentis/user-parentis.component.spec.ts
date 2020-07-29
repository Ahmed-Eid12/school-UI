import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserParentisComponent } from './user-parentis.component';

describe('UserParentisComponent', () => {
  let component: UserParentisComponent;
  let fixture: ComponentFixture<UserParentisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserParentisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserParentisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
