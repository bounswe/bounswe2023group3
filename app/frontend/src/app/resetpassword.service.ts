import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

  resetPassword(token: number, id: string, password: string) {
    return this.http.post<any>('http://51.20.129.231:1923/auth/reset-password', { resetPasswordToken: token, id, password });
  }
}