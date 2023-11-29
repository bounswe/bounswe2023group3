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

  constructor(private router: Router) {
    this.username = localStorage.getItem('username')
    this.firstname = localStorage.getItem('firstname')
  }

  logOut() {
    this.router.navigate(['/app-welcome'])
    localStorage.setItem('loggedIn', 'false')
  }
}
