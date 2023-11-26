import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ModeratorSideBarComponent } from './moderator-side-bar.component'

describe('ModeratorSideBarComponent', () => {
  let component: ModeratorSideBarComponent
  let fixture: ComponentFixture<ModeratorSideBarComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeratorSideBarComponent],
    })
    fixture = TestBed.createComponent(ModeratorSideBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
