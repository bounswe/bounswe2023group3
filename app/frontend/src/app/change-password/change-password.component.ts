import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment'


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword: string = ''
  password: string = ''
  passwordConfirm: string = ''
  options!: any
  apiUrl = environment.apiBaseUrl;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {
    this.options = this.authService.getHeaders();
  }

  onSubmit(){
    this.http.put(this.apiUrl + '/user/password',{"oldPassword":this.oldPassword,"password":this.password,
    "passwordConfirm":this.passwordConfirm},this.options).subscribe(
      (response: any) => {
          window.location.reload()
          window.alert('Password changed.')
      },
      (error) => {
        console.error('Error:', error)
      },
    )
  }
}
