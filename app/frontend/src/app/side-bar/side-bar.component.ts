import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  username: any
  firstname: any
  lastname: any
  profile_picture: any
  isAuthenticated: boolean = false

  constructor(private router: Router) {
    this.username = localStorage.getItem('username')
    this.firstname = localStorage.getItem('firstname')
    this.lastname = localStorage.getItem('lastname')
    this.profile_picture = localStorage.getItem('profile_picture')
    if (this.username) {
      this.isAuthenticated = true
    }
  }

  logOut() {
    this.router.navigate(['/app-welcome'])
    localStorage.clear()
    localStorage.setItem('loggedIn', 'false')
  }
}
