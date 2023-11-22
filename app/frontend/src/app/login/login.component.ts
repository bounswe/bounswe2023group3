import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string = ''
  email: string = ''
  password: string = ''

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {}

  onSubmit() {
    const userCredentials = {
      email: this.email,
      password: this.password,
    }

    this.authService
      .login(userCredentials.email, userCredentials.password)
      .subscribe(
        (response) => {
          // Registration successful, handle the response as needed
          console.log('Login success:', response) 
          //this.errorMessage = 'Login success'
          this.router.navigate(['/app-home'])
        },
        (error) => {
          // Registration failed, handle the error as needed
          console.error('Login error:', error)
          this.errorMessage = 'Error during login. Please try again later.'
        },
      )
  }
}
