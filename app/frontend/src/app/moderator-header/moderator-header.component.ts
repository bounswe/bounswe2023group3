import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moderator-header',
  templateUrl: './moderator-header.component.html',
  styleUrls: ['./moderator-header.component.css']
})
export class ModeratorHeaderComponent {
  constructor(private router: Router) {}
  
  redirectToHome() {
    this.router.navigate(['/app-moderator-requests']);
  }

}
