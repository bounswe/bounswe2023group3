import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Application {
  name: string;
  surname: string;
  email: string;
  cv: File | null;
  reason: string;
}

@Component({
  selector: 'app-moderator-apply',
  templateUrl: './moderator-apply.component.html',
  styleUrls: ['./moderator-apply.component.css']
})
export class ModeratorApplyComponent {
  application: Application = {
    name: '',
    surname: '',
    email: '',
    cv: null,
    reason: ''
  };

  email: string = '';
  applicationSubmitted: boolean = false;

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Application submitted:', this.application);
      this.applicationSubmitted = true;
    }
  }

  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.application.cv = fileInput.files[0] as File;
      console.log('Selected file:', fileInput.files[0].name);
    } else {
      // If the user cancels the file selection, reset the CV property
      this.application.cv = null;
    }
  }

  getLabel(): string {
    return this.application.cv ? (this.application.cv as File).name : 'Change CV';
  }

}
