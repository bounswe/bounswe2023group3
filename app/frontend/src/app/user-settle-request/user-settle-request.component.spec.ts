import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettleRequestComponent } from './user-settle-request.component';

describe('UserSettleRequestComponent', () => {
  let component: UserSettleRequestComponent;
  let fixture: ComponentFixture<UserSettleRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSettleRequestComponent]
    });
    fixture = TestBed.createComponent(UserSettleRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
