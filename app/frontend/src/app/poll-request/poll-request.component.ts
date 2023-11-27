import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-poll-request',
  templateUrl: './poll-request.component.html',
  styleUrls: ['./poll-request.component.css'],
})
export class PollRequestComponent implements OnInit {
  pollForm: FormGroup

  constructor(
    public fb: FormBuilder, //for testing, should be fixed later
    private http: HttpClient,
  ) {
    this.pollForm = this.fb.group({
      question: ['', Validators.required],
      tags: this.fb.array([this.fb.control('')]),
      options: this.fb.array([this.fb.control('')]),
      due_date: ['', Validators.required],
    })
  }

  getToken(): string | null {
    return localStorage.getItem('authToken')
  }

  get tags() {
    return this.pollForm.get('tags') as FormArray
  }

  get options() {
    return this.pollForm.get('options') as FormArray
  }

  addTag() {
    this.tags.push(this.fb.control(''))
  }

  addOption() {
    this.options.push(this.fb.control(''))
  }

  ngOnInit(): void {}

  onSubmit() {
    const formValue = this.pollForm.value
    const token = this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    const options = { headers }
    console.log(formValue)

    if (
      formValue.tags.length === 0 ||
      formValue.options.length === 0 ||
      formValue.question === '' ||
      formValue.due_date === ''
    ) {
      window.alert('Error creating poll: Some fields are empty')
      console.error('Error creating poll: Some fields empty')
      return
    }

    this.http
      .post('http://34.105.66.254:1923/poll', formValue, options)
      .subscribe(
        (response) => {
          console.log('Poll created', response)
          window.location.reload()
        },
        (error) => {
          if (error.status === 401) {
            window.alert('Error: Unauthorized access. Please verify account.')
            window.location.reload()
          }
          console.error('Error creating poll', error)
        },
      )
  }

  reload() {
    window.location.reload()
  }
}
