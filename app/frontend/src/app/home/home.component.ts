import { HttpClient } from '@angular/common/http'
import { Component, Input } from '@angular/core'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  polls!: any[]
  following!: any[]
  isAuthenticated: boolean = false
  clickedButton: string = '';
  settledMode!: boolean
  options!: any

  constructor(private http: HttpClient,private authService: AuthService) {
    this.options = this.authService.getHeaders();
    this.settledMode = false

    this.http.get('http://34.105.66.254:1923/poll/?approveStatus=true').subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }

  ngOnInit() {
    this.settledMode = false
    if (localStorage.getItem('user_id')) {
      this.isAuthenticated = true
    }
  }

  settledPolls(isSettled: boolean) {
    this.http.get('http://34.105.66.254:1923/poll/?approveStatus=true').subscribe(
      (response: any) => {
        this.polls = []
        for (const r of response) {
          if (!r.is_settled && !isSettled) {
            this.polls.push(r)
            this.settledMode = false
          }
          if (r.is_settled==2 && isSettled) {
            this.polls.push(r)
            this.settledMode = true
          }
        }
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }

  trendingPolls() {
    this.clickedButton = 'trending';
    this.settledMode = false
    this.http.get('http://34.105.66.254:1923/poll/?tags='+['Trending']+'&?approveStatus=true').subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }

  followingPolls() {
    this.clickedButton = 'following';
    this.settledMode = false
    this.http.get('http://34.105.66.254:1923/poll/my-followings',this.options).subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }
}
