import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  verificationCode: string = '';

  constructor(private router: Router) {}

  verifyAccount() {
    // Implement verification logic here
    // This could involve sending the verification code to a backend service
    console.log('Verifying with code:', this.verificationCode);

    // Navigate to a different page upon successful verification
    // this.router.navigate(['/some-other-route']);
  }
}
