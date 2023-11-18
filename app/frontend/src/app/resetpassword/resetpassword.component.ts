import { Component } from '@angular/core'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordToken!: number
  email: string
  password: string
  errorMessage: string

  constructor(private authService: AuthService) {
    this.email = ''
    this.password = ''
    this.errorMessage = ''
  }

  resetPassword() {
    this.authService
      .resetPassword(this.resetPasswordToken, this.email, this.password)
      .subscribe(
        (response) => {
          if (response.status == 400) {
            this.errorMessage =
              'Please provide a valid password with at least 6 characters.'
          } else {
            console.log('Password reset successful', response)
            this.errorMessage = 'Password reset successful.'
          }
        },
        (error) => {
          // Handle any errors, display an error message, etc.
          this.errorMessage = 'Password reset failed. Please try again.'
        },
      ).unsubscribe
  }
}
