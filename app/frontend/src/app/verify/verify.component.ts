import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent {
  verificationCode!: number
  email!: string
  errorMessage: string = ''
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  onSubmit() {
    const userCredentials = {
      email: this.email,
    }

    // Send a POST request to the backend for authentication
    this.http
      .post('http://34.105.66.254:1923/auth/verify', userCredentials)
      .subscribe(
        (response: any) => {
          // Authentication successful, you can handle the response here

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
