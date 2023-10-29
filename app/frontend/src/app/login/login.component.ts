import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = 'test1@denrox.com';
  password: string = 'test11';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const userCredentials = {
      email: this.email,
      password: this.password
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
