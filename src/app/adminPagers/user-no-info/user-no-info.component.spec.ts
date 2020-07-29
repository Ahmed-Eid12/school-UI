import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNoInfoComponent } from './user-no-info.component';

describe('UserNoInfoComponent', () => {
  let component: UserNoInfoComponent;
  let fixture: ComponentFixture<UserNoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
