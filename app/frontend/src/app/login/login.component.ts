import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const userCredentials = {
      email: this.email,
      password: this.password
    };

    // Send a POST request to the backend for authentication
    this.http.post('http://51.20.129.231:1923//auth/login', userCredentials).subscribe(
      (response: any) => {
        // Authentication successful, you can handle the response here
        console.log('Login successful');
      },
      (error) => {
        // Authentication failed, handle the error
        console.error('Login failed');
        this.errorMessage = 'Invalid email or password'; // Display an error message
      }
    );
  }
}
