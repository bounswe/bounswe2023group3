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
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.pollForm = this.fb.group({
      question: ['', Validators.required],
      tags: this.fb.array([this.fb.control('')]),
      options: this.fb.array([this.fb.control('')]),
      due_date: ['2023-05-19T15:23:46.789Z', Validators.required],
    })
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
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
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const options = { headers };
    console.log(formValue)
    this.http
      .post('http://34.105.66.254:1923/poll', formValue, options)
      .subscribe((response) => {
        console.log('Poll created', response)
      })
  }

  reload() {
    window.location.reload()
  }
}
