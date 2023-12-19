import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPendingRequestsComponent } from './user-pending-requests.component';

describe('UserPendingRequestsComponent', () => {
  let component: UserPendingRequestsComponent;
  let fixture: ComponentFixture<UserPendingRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPendingRequestsComponent]
    });
    fixture = TestBed.createComponent(UserPendingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
