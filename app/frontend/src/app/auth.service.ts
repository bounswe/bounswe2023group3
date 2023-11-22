import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn!: boolean
  private apiUrl = 'http://34.105.66.254:1923/auth'

  constructor(private http: HttpClient) {}

  // User login
  login(email: string, password: string): Observable<any> {
    const credentials = { email, password }
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.access_token)
        this.loggedIn = true
      }),
      catchError(this.handleError('Login', {})),
    )
  }

  //get authentication token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // User registration
  register(email: string, password: string, username: string): Observable<any> {
    const user = { email, password, username }
    return this.http
      .post<any>(`${this.apiUrl}/register`, user)
      .pipe(catchError(this.handleError('Registration', {})))
  }

  resetPassword(
    resetPasswordToken: number,
    email: string,
    password: string,
  ): Observable<any> {
    const user = { resetPasswordToken, email, password }
    return this.http
      .post<any>(`${this.apiUrl}/reset-password`, user)
      .pipe(catchError(this.handleError('Reset Password', {})))
  }

  // Handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`)
      // Handle the error, e.g., display a user-friendly message
      return of(result as T)
    }
  }

  isLoggedIn() {
    return this.loggedIn
  }
}
