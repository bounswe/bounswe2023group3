import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  redirectToHome() {
    if(localStorage.getItem('loggedIn')=='true') {
      this.router.navigate(['/app-home'])
    }
    else{
      this.router.navigate(['/app-welcome'])
      localStorage.clear()
      localStorage.setItem('loggedIn', 'false')
    }
  }
}
