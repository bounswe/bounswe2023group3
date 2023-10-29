import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  email: string = 'test1@denrox.com';
  errorMessage: string = '';
  constructor(private http: HttpClient) {}

  onSubmit() {
    const userCredentials = {
      email: this.email
    };

    // Send a POST request to the backend for authentication
    this.http.post('https://your-backend-url/auth/login', userCredentials).subscribe(
      (response: any) => {
        // Authentication successful, you can handle the response here
        console.log('Authentication successful');
      },
      (error) => {
        // Authentication failed, handle the error
        console.error('Authentication failed');
        this.errorMessage = 'Invalid email or password'; // Display an error message
      }
    );
  }

}