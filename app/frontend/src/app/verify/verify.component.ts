import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent {
  verificationForm: FormGroup;
  verificationCode!: number
  email!: string
  errorMessage: string = ''
  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
      this.verificationForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        verificationCode: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      });
    }

  onSubmit() {
    const userCredentials = {
      email: this.email,
      verificationCode: +this.verificationCode
    }

    console.log(userCredentials)

    // Send a POST request to the backend for authentication
    this.http
      .post('http://34.105.66.254:1923/auth/verify', userCredentials)
      .subscribe(
        (response: any) => {
          // Authentication successful, you can handle the response here
          this.errorMessage = 'Verification successful'
          this.router.navigate(['/app-home'])
        },
        (error) => {
          // Authentication failed, handle the error
          console.error('Authentication failed')
          this.errorMessage = 'Invalid email or verification code' // Display an error message
        },
      )
  }
}
