import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any
  private apiUrl = environment.apiBaseUrl + "/auth";

  constructor(private http: HttpClient) {}

  // User login
  login(email: string, password: string): Observable<any> {
    const credentials = { email, password }
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.access_token)
        console.log(response.access_token)
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('moderatorloggedIn', 'false')
        localStorage.setItem('user_id', response.user.id)
        localStorage.setItem('username', response.user.username)
        localStorage.setItem('firstname', response.user.firstname)
        localStorage.setItem('lastname', response.user.lastname)
        localStorage.setItem('profile_picture', response.user.profile_picture)
        localStorage.setItem('isVerified', response.user.isVerified)
      }),
    )
  }

  //Moderator Login
  moderatorLogin(email: string, password: string): Observable<any> {
    const credentials = { email, password }
    return this.http
      .post<any>(environment.apiBaseUrl + `/moderator/login`, credentials)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('authToken', response.access_token)
          localStorage.setItem('moderatorloggedIn', 'true')
          localStorage.setItem('loggedIn', 'false')
          localStorage.setItem('user_id', response.moderator.id)
          localStorage.setItem('username', response.moderator.username)
        }),
      )
  }

  //get authentication token
  getToken(): string | null {
    return localStorage.getItem('authToken')
  }

  getHeaders(): any {
    if (this.getToken()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`,
        'Content-Type': 'application/json'
      })
      const options = { headers }
      console.log(options)
      return options
    }
  }

  // Assuming `getToken()` is a method in your class that returns the authentication token.

  // User registration
  register(
    email: string,
    password: string,
    username: string,
    firstname: string,
    lastname: string,
  ): Observable<any> {
    const user = { email, password, username, firstname, lastname }
    return this.http
      .post<any>(`${this.apiUrl}/register`, user)
      .pipe(catchError(this.handleError('Registration', {})))
  }

  resetPassword(
    resetPasswordToken: number,
    email: string,
    password: string,
  ): Observable<any> {
    let user = {
      resetPasswordToken: +resetPasswordToken,
      email: email,
      password: password,
    }
    return this.http
      .post<any>(`${this.apiUrl}/reset-password`, user)
      .pipe(
        catchError(
          this.handleError('Reset Password', { responseType: 'text' }),
        ),
      )
  }

  // Handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`)
      // Handle the error, e.g., display a user-friendly message
      return of(result as T)
    }
  }

  setUser(user: any): void {
    this.user = user
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser(): any {
    return this.user || JSON.parse(localStorage.getItem('user') || '{}')
  }
  getUserId(): any {
    return localStorage.getItem('user_id')
  }
}
