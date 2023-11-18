import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PollViewComponent } from './poll-view.component'

describe('PollViewComponent', () => {
  let component: PollViewComponent
  let fixture: ComponentFixture<PollViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PollViewComponent],
    })
    fixture = TestBed.createComponent(PollViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
