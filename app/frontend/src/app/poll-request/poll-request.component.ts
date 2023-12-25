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
  no_deadline: boolean = false;
  shortLink!: string;
  tag_data!: {id: string, name:string}[];

  constructor(
    public fb: FormBuilder, //for testing, should be fixed later
    private http: HttpClient,
  ) {
    this.pollForm = this.fb.group({
      question: ['', Validators.required],
      description: [''],
      tags: this.fb.array([this.fb.control('')]),
      options: this.fb.array([this.fb.control('')]),
      due_date: [''],
    })
  }

  
  receiveShortLink(shortLink: string) {
    this.shortLink = shortLink;
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

  deleteTag(index: number): void {
    const tags = this.pollForm.get('tags') as FormArray
    tags.removeAt(index)
  }

  addOption() {
    this.options.push(this.fb.control(''))
  }

  deleteOption(index: number): void {
    const options = this.pollForm.get('options') as FormArray
    options.removeAt(index)
  }

  ngOnInit(): void {
    this.http.get<{id: string, name:string}[]>('http://34.105.66.254:1923/tag').subscribe(
      (response: {id: string, name:string}[]) => {
        this.tag_data = response;
      },
      (error) => {
        console.error('Error fetching tags:', error)
      },
    )


  }

  onSubmit() {
    const formValue = this.pollForm.value;
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const options = { headers };

    if (
      formValue.tags.length === 0 ||
      formValue.options.length === 0 ||
      formValue.question === ''
    ) {
      window.alert('Error creating poll: Some fields are empty');
      console.error('Error creating poll: Some fields empty');
      return;
    }
  
    if (this.no_deadline) {
      formValue.due_date = 'No deadline';
    }

    if (this.shortLink !== null && this.shortLink !== undefined && this.shortLink.trim() !== '') {
      formValue.image_urls = [this.shortLink];
    }

    this.http
      .post('http://34.105.66.254:1923/poll', formValue, options)
      .subscribe(
        (response) => {
          console.log('Poll created', response)
          window.location.reload()
          window.alert('Poll creation request sent.')
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
  

  handleCheckboxChange(){
    this.no_deadline = !this.no_deadline
  }

  reload() {
    window.location.reload()
  }
}
