import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { UserService } from 'src/services/user-service/user.service'
import { User } from './user.model'
import { AuthService } from '../auth.service'

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

  isEditing: boolean = false
  editedUsername!: string
  options!: any


  constructor(
    private http: HttpClient,
    private _userService: UserService,
    private authService: AuthService,
  ) {
    this.options = this.authService.getHeaders();
    this.user_id = localStorage.getItem('user_id')
    this.username = localStorage.getItem('username')
    this.firstname = localStorage.getItem('firstname')
    this.http.get('http://34.105.66.254:1923/poll/?creatorId='+this.user_id+"&?approveStatus=true").subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
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
    this.http.get('http://34.105.66.254:1923/poll/?creatorId='+this.user_id+"&?approveStatus=true").subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }
  likedPolls() {
    this.http
      .get('http://34.105.66.254:1923/poll/?likedById=' + this.user_id+"&?approveStatus=true")
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
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {
        this.polls = []
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }

  toggleEdit(){
    this.isEditing=true
  }

  editProfile() {

    if(this.editedUsername!=""){
      
      this.http.put('http://34.105.66.254:1923/user/',{"firstname":this.editedUsername},this.options).subscribe(
      (response: any) => {
      },
      (error) => {
        console.error('Error:', error)
      },
    )
      this.firstname=this.editedUsername
      this.isEditing=false
    }
   
  }

}
