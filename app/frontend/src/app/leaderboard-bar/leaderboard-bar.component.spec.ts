import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardBarComponent } from './leaderboard-bar.component';

describe('LeaderboardBarComponent', () => {
  let component: LeaderboardBarComponent;
  let fixture: ComponentFixture<LeaderboardBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardBarComponent]
    });
    fixture = TestBed.createComponent(LeaderboardBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
