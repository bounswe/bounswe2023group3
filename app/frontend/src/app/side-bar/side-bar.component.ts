import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/services/user-service/user.service'
import { User } from '../user-profile/user.model'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  username: any
  firstname: any
  lastname: any
  profile_picture: any=null
  isAuthenticated: boolean = false

  showSettings: boolean = false

  constructor(private router: Router,private _userService: UserService,) {
    this.username = localStorage.getItem('username')
    this._userService.getUser(this.username).then((user: User) => {
      this.profile_picture = user.profile_picture
      this.firstname = user.firstname
      this.lastname = user.lastname
    })
    if (this.username) {
      this.isAuthenticated = true
    }
  }

  goToSettings(){
    this.showSettings=!this.showSettings
  }

  logOut() {
    this.router.navigate(['/app-welcome'])
    localStorage.clear()
    localStorage.setItem('loggedIn', 'false')
  }
}
