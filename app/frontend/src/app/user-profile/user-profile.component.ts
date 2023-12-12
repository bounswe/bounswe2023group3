import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { UserService } from 'src/services/user-service/user.service'
import { User } from './user.model'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  polls!: any[]
  user_id!: any
  username: any
  firstname: any
  nofFollowers: number = 0
  nofFollowees: number = 0
  clickedButton: string = '';

  constructor(
    private http: HttpClient,
    private _userService: UserService,
  ) {
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {
        this.polls = []
        for (const r of response) {
          if (r.creator.id == this.user_id) {
            this.polls.push(r)
          }
        }
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    this.user_id = localStorage.getItem('user_id')
    this.username = localStorage.getItem('username')
    this.firstname = localStorage.getItem('firstname')

    this._userService.getUser(this.username).then((user: User) => {
      this.nofFollowees = user.followings.map(
        (followee: User) => followee.id,
      ).length
      this.nofFollowers = user.followers.map(
        (follower: User) => follower.id,
      ).length
    })
  }

  createdPolls() {
    this.clickedButton = 'created';
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {
        this.polls = []
        for (const r of response) {
          if (r.creator.id == this.user_id) {
            this.polls.push(r)
          }
        }
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }
  likedPolls() {
    this.clickedButton = 'liked';
    this.http
      .get('http://34.105.66.254:1923/poll/?likedById=' + this.user_id)
      .subscribe(
        (response: any) => {
          this.polls = response
        },
        (error) => {
          console.error('Error fetching polls:', error)
        },
      )
  }
  votedPolls() {
    this.clickedButton = 'voted';
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {
        this.polls = []
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }
}
