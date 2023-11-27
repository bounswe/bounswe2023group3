import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing'

import { PollRequestComponent } from './poll-request.component'
import { HeaderComponent } from '../header/header.component'
import { SideBarComponent } from '../side-bar/side-bar.component'
import { HttpClientModule } from '@angular/common/http'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

describe('PollRequestComponent', () => {
  let component: PollRequestComponent
  let fixture: ComponentFixture<PollRequestComponent>
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PollRequestComponent, HeaderComponent, SideBarComponent],
      imports: [HttpClientModule, HttpClientTestingModule, ReactiveFormsModule],
    })
    fixture = TestBed.createComponent(PollRequestComponent)
    component = fixture.componentInstance
    httpTestingController = TestBed.inject(HttpTestingController)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should not send a post request on valid form submission when no tags are provided', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mockToken')

    component.tags.clear()
    component.options.clear()
    ;['Option 1', 'Option 2'].forEach((option) =>
      component.options.push(component.fb.control(option)),
    )

    component.pollForm.patchValue({
      question: 'Sample Question',
      due_date: '2023-05-19T15:23:46.789Z',
    })

    component.onSubmit()

    httpTestingController.expectNone('http://34.105.66.254:1923/poll')
    httpTestingController.verify()
  }))
})
