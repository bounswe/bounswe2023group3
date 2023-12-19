import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowListComponent } from './follow-list.component';

describe('FollowListComponent', () => {
  let component: FollowListComponent;
  let fixture: ComponentFixture<FollowListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowListComponent]
    });
    fixture = TestBed.createComponent(FollowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
