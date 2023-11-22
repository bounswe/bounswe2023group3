import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorRequestsComponent } from './moderator-requests.component';

describe('ModeratorRequestsComponent', () => {
  let component: ModeratorRequestsComponent;
  let fixture: ComponentFixture<ModeratorRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeratorRequestsComponent]
    });
    fixture = TestBed.createComponent(ModeratorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
