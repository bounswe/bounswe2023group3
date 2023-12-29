import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'


@Component({
  selector: 'app-forget-password',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent {
  email!: string
  errorMessage: string = ''
  apiUrl = environment.apiBaseUrl;

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
      .post(this.apiUrl + '/auth/forgot-password', userCredentials)
      .subscribe(
        (response: any) => {
          // Authentication successful, you can handle the response here
          console.log('Code is sent')
          this.errorMessage = 'Code is sent'
          this.router.navigate(['/app-reset-password'])
        },
        (error) => {
          // Authentication failed, handle the error
          console.error('Authentication failed')
          this.errorMessage = 'Invalid email or password' // Display an error message
        },
      )
  }
}
