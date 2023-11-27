import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ModeratorPollReviewComponent } from './moderator-poll-review.component'

describe('ModeratorPollReviewComponent', () => {
  let component: ModeratorPollReviewComponent
  let fixture: ComponentFixture<ModeratorPollReviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorPollReviewComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ModeratorPollReviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
