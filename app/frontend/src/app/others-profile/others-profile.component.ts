import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { User } from '../user-profile/user.model'
import { UserService } from 'src/services/user-service/user.service'

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.component.html',
  styleUrls: ['./others-profile.component.css'],
})
export class OthersProfileComponent implements OnInit {
  polls: any[] = []
  user!: User; //user: User | undefined;

  constructor(private http: HttpClient, private _userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
      this.route.params.subscribe((params) => {
        const usernameToFetch = params['username']
  
        // Fetch user data when the component initializes
        this._userService
          .getUser(usernameToFetch)
          .then((user: any) => {
            this.user = user
              this.http.get('http://34.105.66.254:1923/poll/?creatorId='+ this.user?.id).subscribe(
                (response: any) => {
                  this.polls = response
                },
                (error) => {
                  console.error('Error fetching polls:', error)
                },
        )
          })
          .catch((error) => {
            console.error('Error fetching user:', error)
          })
      })
  
      

  }
}
