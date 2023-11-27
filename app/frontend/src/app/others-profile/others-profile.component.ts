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
  userId = "";
  self_username= localStorage.getItem("username");
  self_userId = localStorage.getItem("user_id");
  nofFollowers: number = 0;
  nofFollowees: number = 0;
  isFollowing: boolean = false;

  constructor(private http: HttpClient, private _userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {  
    this.route.params.subscribe((params) => {
      const usernameToFetch = params['username']
      // Fetch user data when the component initializes
      this._userService.getUser(usernameToFetch).then((user: any) => {
        this.user = user;
        //get follower and followee numbers
        this.nofFollowees = (this.user.followings?.map((followee: User) => followee.id)).length;
        this.nofFollowers = (this.user.followers?.map((follower: User) => follower.id)).length;
        this.userId = user.id;
        this.http.get('http://34.105.66.254:1923/poll/?creatorId='+ this.user?.id).subscribe(
          (response: any) => {
            this.polls = response
          },
          (error) => {
            console.error('Error fetching polls:', error)
           })
      
        //get follow status
        // check if the other_user's id is in the followee list
        if(this.self_username){
          console.log(this.userId);
          this._userService.getFolloweeIds(this.self_username).then((followeeList: string[]) => {

            if(!followeeList){
              this.isFollowing = false;
            }
            else{
              this.isFollowing = followeeList.includes(this.userId);
            }
            console.log(followeeList);
            console.log(this.userId);
            console.log("Is following after Followee list check", this.isFollowing);
          })     
        }
      })
      .catch((error) => {
        console.error('Error fetching user:', error)
      })   
    })      
    if(this.self_username) {
      this._userService.getUser(this.self_username).then((self_user: any) => {
        if(self_user) {
          
        }
      });
    }
  }

  toggleFollow(): void {
    if (this.user) {
      // If user is currently following, unfollow; otherwise, follow
      if (this.isFollowing) {
        this._userService.unfollow(this.user.id);
        this.nofFollowers -= 1;
      } else {
        this._userService.follow(this.user.id);
        this.nofFollowers += 1;
      }
      this.isFollowing = !this.isFollowing; //change the follow status
    }
  }

  
}
