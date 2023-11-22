import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (localStorage.getItem("loggedIn")=="true") {
      return true // Allow access to the route
    } else {
      this.router.navigate(['/app-login'])
      return false
    }
  }
}
