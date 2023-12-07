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
  lastname: any
  profile_picture!: any 
  nofFollowers: number = 0
  nofFollowees: number = 0

  isEditing: boolean = false
  editedFirstname!: string
  editedLastname!: string
  options!: any


  constructor(
    private http: HttpClient,
    private _userService: UserService,
    private authService: AuthService,
  ) {
    this.options = this.authService.getHeaders();
    this.http.get('http://34.105.66.254:1923/poll/?creatorId='+this.user_id+"&?approveStatus=true").subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    this.user_id = localStorage.getItem('user_id')
    this.username = localStorage.getItem('username')
    this.firstname = localStorage.getItem('firstname')
    this.lastname = localStorage.getItem('lastname')

    this._userService.getUser(this.username).then((user: User) => {
      this.profile_picture = user.profile_picture
      this.nofFollowees = user.followings.map(
        (followee: User) => followee.id,
      ).length
      this.nofFollowers = user.followers.map(
        (follower: User) => follower.id,
      ).length
    })
  }

  ngOnInit(){
    this.profile_picture = localStorage.getItem('profile_picture')

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


    if(this.editedFirstname || this.editedLastname){

      const body: any = {}; 

      if (this.editedFirstname !== null && this.editedFirstname !== undefined && this.editedFirstname.trim() !== '') {
        body.firstname = this.editedFirstname;
        this.firstname=this.editedFirstname
      }
    
      if (this.editedLastname !== null && this.editedLastname !== undefined && this.editedLastname.trim() !== '') {
        body.lastname = this.editedLastname;
        this.lastname=this.editedLastname
      }
      
      this.http.put('http://34.105.66.254:1923/user/',body,this.options).subscribe(
      (response: any) => {
       
      },
      (error) => {
        console.error('Error:', error)
      },
    )
    }
    this.isEditing=false
  }

}
