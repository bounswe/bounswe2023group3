import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-moderator-side-bar',
  templateUrl: './moderator-side-bar.component.html',
  styleUrls: ['./moderator-side-bar.component.css'],
})
export class ModeratorSideBarComponent {
  username: any

  constructor(private router: Router) {
    this.username = localStorage.getItem('username')
  }

  logOut() {
    this.router.navigate(['/app-welcome'])
    localStorage.setItem('moderatorloggedIn', 'false')
  }
}
