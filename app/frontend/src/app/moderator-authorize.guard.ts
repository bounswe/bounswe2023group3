import { CanActivateFn } from '@angular/router'
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class ModeratorAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (localStorage.getItem('moderatorloggedIn') == 'true') {
      return true // Allow access to the route
    } else {
      this.router.navigate(['/app-moderator-login'])
      return false
    }
  }
}
