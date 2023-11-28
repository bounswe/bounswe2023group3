import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ModeratorHeaderComponent } from './moderator-header.component'

describe('ModeratorHeaderComponent', () => {
  let component: ModeratorHeaderComponent
  let fixture: ComponentFixture<ModeratorHeaderComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeratorHeaderComponent],
    })
    fixture = TestBed.createComponent(ModeratorHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
