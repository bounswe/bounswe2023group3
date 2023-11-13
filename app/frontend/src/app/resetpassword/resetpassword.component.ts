import { Component } from '@angular/core'
import { ResetPasswordService } from '../resetpassword.service'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordToken!: number
  id: string
  password: string
  errorMessage: string

  constructor(private resetPasswordService: ResetPasswordService) {
    this.id = ''
    this.password = ''
    this.errorMessage = ''
  }

  resetPassword() {
    this.resetPasswordService
      .resetPassword(this.resetPasswordToken, this.id, this.password)
      .subscribe(
        (response) => {
          // Password reset successful, handle the response as needed
          console.log('Password reset successful', response)
        },
        (error) => {
          // Handle any errors, display an error message, etc.
          this.errorMessage = 'Password reset failed. Please try again.'
        },
      )
  }
}
