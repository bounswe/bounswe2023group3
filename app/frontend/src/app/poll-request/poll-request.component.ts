import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-poll-request',
  templateUrl: './poll-request.component.html',
  styleUrls: ['./poll-request.component.css']
})
export class PollRequestComponent implements OnInit {
  pollForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.pollForm = this.fb.group({
      creator: ['', Validators.required],
      question: ['', Validators.required],
      tags: this.fb.array([this.fb.control('')]),
      options: this.fb.array([this.fb.control('')])
    });
  }

  get tags() {
    return this.pollForm.get('tags') as FormArray;
  }

  get options() {
    return this.pollForm.get('options') as FormArray;
  }

  addTag() {
    this.tags.push(this.fb.control(''));
  }

  addOption() {
    this.options.push(this.fb.control(''));
  }

  ngOnInit(): void {}

  onSubmit() {
    const formValue = this.pollForm.value;
    this.http.post('http://51.20.129.231:1923/poll', formValue).subscribe(response => {
      console.log('Poll created', response);
    });
  }
}
