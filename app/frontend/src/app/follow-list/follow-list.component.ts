import { Component, Input } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css']
})
export class FollowListComponent {
  @Input() followList!: any[]
  @Input() title!: string

  constructor(
    private router: Router,
  ) {}


  navigateToProfile(username: string) { 
    this.router.navigate(['/app-profile', username]).then(() => {
      window.location.reload();
    });
  }

}
