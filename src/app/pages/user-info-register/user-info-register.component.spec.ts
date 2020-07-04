import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoRegisterComponent } from './user-info-register.component';

describe('UserInfoRegisterComponent', () => {
  let component: UserInfoRegisterComponent;
  let fixture: ComponentFixture<UserInfoRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
