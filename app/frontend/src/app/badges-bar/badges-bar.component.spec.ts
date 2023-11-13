import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BadgesBarComponent } from './badges-bar.component'

describe('BadgesBarComponent', () => {
  let component: BadgesBarComponent
  let fixture: ComponentFixture<BadgesBarComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgesBarComponent],
    })
    fixture = TestBed.createComponent(BadgesBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
