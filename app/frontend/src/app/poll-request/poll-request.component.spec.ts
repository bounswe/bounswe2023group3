import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollRequestComponent } from './poll-request.component';

describe('PollRequestComponent', () => {
  let component: PollRequestComponent;
  let fixture: ComponentFixture<PollRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PollRequestComponent]
    });
    fixture = TestBed.createComponent(PollRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
