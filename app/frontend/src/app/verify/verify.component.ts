import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent {
  verificationForm: FormGroup
  errorMessage: string = ''
  options!: any

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.options = this.authService.getHeaders();
    this.verificationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}$/)],
      ],
    })
  }

  onSubmit() {
    
    const userCredentials = {
      email: this.verificationForm.value.email,
      verificationCode: Number(this.verificationForm.value.verificationCode),
    };

    console.log(userCredentials)

    // Send a POST request to the backend for authentication
    this.http
      .post('http://34.105.66.254:1923/auth/verify', userCredentials, this.options)
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
