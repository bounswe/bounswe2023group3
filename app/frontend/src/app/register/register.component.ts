import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({})
  errorMessage: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(8)]],
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
    })
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      const { email, password, username, firstname, lastname } = this.registrationForm.value
      this.authService.register(email, password, username, firstname, lastname).subscribe(
        (response) => {
          // Registration successful, handle the response as needed
          console.log('Registration success:', response)
          this.router.navigate(['/app-login'])
        },
        (error) => {
          // Registration failed, handle the error as needed
          console.error('Registration error:', error)
        },
      )
    }
  }
}
