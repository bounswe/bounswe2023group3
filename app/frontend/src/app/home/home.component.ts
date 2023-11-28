import { HttpClient } from '@angular/common/http'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  polls!: any[]
  following!: any[]

  constructor(private http: HttpClient) {
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }

  ngOnInit() {}

  settledPolls(isSettled: boolean) {
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {
        this.polls = []
        for (const r of response) {
          if (!r.is_settled && !isSettled) {
            this.polls.push(r)
          }
          if (r.is_settled && isSettled) {
            this.polls.push(r)
          }
        }
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }

  trendingPolls() {
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {
        this.polls = []
        for (const r of response) {
          for (const t of r.tags) {
            if (t.name === 'Trending') {
              this.polls.push(r)
            }
          }
        }
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }

  followingPolls() {
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (pollResponse: any) => {
        const user_id = localStorage.getItem('user_id')
        console.log(user_id)
        this.http.get('http://34.105.66.254:1923/user/' + user_id).subscribe(
          (response: any) => {
            this.following = response.followings
            console.log(response.followings)
            this.polls = []
            for (const r of pollResponse) {
              for (const account of this.following) {
                if (r.creator.id == account.id) {
                  this.polls.push(r)
                  break
                }
              }
            }
          },
          (error) => {
            console.error('Error fetching polls:', error)
          },
        )
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }
}
