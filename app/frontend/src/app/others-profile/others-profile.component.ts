import { HttpClient } from '@angular/common/http'
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { User } from '../user-profile/user.model'
import { UserService } from 'src/services/user-service/user.service'
import { AuthService } from '../auth.service'
import { environment } from 'src/environments/environment'


@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.component.html',
  styleUrls: ['./others-profile.component.css'],
})
export class OthersProfileComponent implements OnInit {
  isAuthenticated: boolean = false
  polls: any[] = []
  user!: User
  userId!: string

  self_username = localStorage.getItem('username')
  self_userId = localStorage.getItem('user_id')
  nofFollowers: number = 0
  nofFollowees: number = 0
  isFollowing: boolean = false
  showFollowers: boolean = false
  showFollowees: boolean = false
  followList!: any[]
  apiUrl = environment.apiBaseUrl;

  clickedButton: string = '';
  @ViewChild('followeesText', { static: true, read: ElementRef }) followeesText!: ElementRef;
  @ViewChild('followersText', { static: true, read: ElementRef }) followersText!: ElementRef;
  

  constructor(
    private http: HttpClient,
    private _userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    if (this.self_userId) {
      this.isAuthenticated = true
    }

    this.route.params.subscribe((params) => {
      const usernameToFetch = params['username']
      // Fetch user data when the component initializes
      this._userService
        .getUser(usernameToFetch)
        .then((user: any) => {
          this.user = user
          //get follower and followee numbers
          this.nofFollowees = (this.user.followings?.map(
            (followee: User) => followee.id,
          )).length
          this.nofFollowers = (this.user.followers?.map(
            (follower: User) => follower.id,
          )).length
          this.userId = user.id
          console.log(this.userId)
          this.http
            .get(this.apiUrl + '/poll/?creatorId=' + this.userId+ '&?approveStatus=true')
            .subscribe(
              (response: any) => {
                this.polls = response
              },
              (error) => {
                console.error('Error fetching polls:', error)
              },
            )

          //get follow status
          // check if the other_user's id is in the followee list
          if (this.self_username) {
            this._userService
              .getFolloweeIds(this.self_username)
              .then((followeeList: string[]) => {
                if (!followeeList) {
                  this.isFollowing = false
                } else {
                  this.isFollowing = followeeList.includes(this.userId)
                }
              })
          }
        })
        .catch((error) => {
          console.error('Error fetching user:', error)
        })
    })
  }

  toggleFollow(): void {
    if (this.user) {
      // If user is currently following, unfollow; otherwise, follow
      if (this.isFollowing) {
        this._userService.unfollow(this.user.id)
        this.nofFollowers -= 1
      } else {
        this._userService.follow(this.user.id)
        this.nofFollowers += 1
      }
      this.isFollowing = !this.isFollowing //change the follow status
    }
  }
  createdPolls() {
    this.clickedButton = 'created';
    this.http.get(this.apiUrl + '/poll/?creatorId='+this.userId+'&?approveStatus=true').subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }

  likedPolls() {
    this.clickedButton = 'liked';
    this.http
      .get(this.apiUrl + '/poll/?likedById=' + this.userId+'&?approveStatus=true')
      .subscribe(
        (response: any) => {
          this.polls = response
        },
        (error) => {
          console.error('Error fetching polls:', error)
        },
      )
  }

  votedPolls(){
    this.clickedButton = 'voted';
    this.http
      .get(this.apiUrl + '/poll/?votedById=' + this.userId+'&?approveStatus=true')
      .subscribe(
        (response: any) => {
          this.polls = response
        },
        (error) => {
          console.error('Error fetching polls:', error)
        },
      )
  }

  toggleFollowers(){
    this.showFollowers=!this.showFollowers
    this.showFollowees = false
    this.followList = []
    if(this.showFollowers){
      this.http.get(this.apiUrl + '/user/'+this.userId).subscribe(
      (response: any) => {
        this.followList= response.followers
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    }
  }

  toggleFollowees(){
    this.showFollowees=!this.showFollowees
    this.showFollowers = false
    this.followList = []
    if(this.showFollowees){
      this.http.get(this.apiUrl + '/user/'+this.userId).subscribe(
      (response: any) => {
        this.followList= response.followings
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    }
  }

  getPopupTop(element: HTMLElement): { top: number; left: number } {
    const textRect = element.getBoundingClientRect();
    const container = element.parentElement;
  
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const top = textRect.bottom - containerRect.top + window.scrollY + 5;
  
      // Calculate the center of the text element
      const textCenter = textRect.left + textRect.width / 2;
  
      // Calculate the left position based on the text center
      const left = textCenter - containerRect.left;
  
      return { top, left };
    }
  
    // Handle the case when the parent element is null
    const top = textRect.bottom + window.scrollY + 5;
    const left = textRect.left; // Adjust as needed
    return { top, left };
  }
  
}
