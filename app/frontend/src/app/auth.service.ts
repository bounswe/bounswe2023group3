import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://51.20.129.231:1923/auth' // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // User login
  login(email: string, password: string): Observable<any> {
    const credentials = { email, password }
    return this.http
      .post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(catchError(this.handleError('Login', {})))
  }

  // User registration
  register(email: string, password: string, username: string): Observable<any> {
    const user = { email, password, username }
    return this.http
      .post<any>(`${this.apiUrl}/register`, user)
      .pipe(catchError(this.handleError('Registration', {})))
  }

  // Handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`)
      // Handle the error, e.g., display a user-friendly message
      return of(result as T)
    }
  }
}
