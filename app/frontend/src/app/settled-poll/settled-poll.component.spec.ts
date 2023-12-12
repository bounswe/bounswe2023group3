import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SettledPollComponent } from './settled-poll.component'

describe('SettledPollComponent', () => {
  let component: SettledPollComponent
  let fixture: ComponentFixture<SettledPollComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettledPollComponent],
    })
    fixture = TestBed.createComponent(SettledPollComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
