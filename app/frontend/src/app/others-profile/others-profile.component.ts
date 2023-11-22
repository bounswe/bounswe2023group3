import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { User } from '../user-profile/user.model'
import { UserService } from 'src/services/user-service/user.service'

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.component.html',
  styleUrls: ['./others-profile.component.css'],
})
export class OthersProfileComponent {
  polls!: any[]
  user: User | undefined;

  constructor(private http: HttpClient, private _userService: UserService) {}

  ngOnInit() {
    // Assuming you have the username you want to fetch from somewhere
    const usernameToFetch = 'test33';

    // Fetch polls
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {
        this.polls = response;
      },
      (error) => {
        console.error('Error fetching polls:', error);
      }
    );

      // Fetch user data when the component initializes
      this._userService.getUser(usernameToFetch)
      .then((user: any) => {

        this.user = user;
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
 
 
  }


  
}
