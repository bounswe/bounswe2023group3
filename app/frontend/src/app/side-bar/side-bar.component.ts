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
  isAuthenticated: boolean = false;

  constructor(private router: Router) {
    this.username = localStorage.getItem('username')
    this.firstname = localStorage.getItem('firstname')
    if(this.username){
      this.isAuthenticated=true
    }
  }

  logOut() {
    this.router.navigate(['/app-welcome'])
    localStorage.clear();
    localStorage.setItem('loggedIn', 'false')
  }
}
