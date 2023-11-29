import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.css'],
})
export class PollViewComponent {
  pollId!: string
  comments!: any[]
  description!: string
  isAuthenticated: boolean = false;


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    if(localStorage.getItem('user_id')){
      this.isAuthenticated=true
    }
    this.route.params.subscribe((params) => {
      this.pollId = params['pollId']
    })
    this.http.get('http://34.105.66.254:1923/comment/' + this.pollId).subscribe(
      (response: any) => {
        this.comments = response
      },
      (error) => {
        console.error('Error fetching poll:', error)
      },
    )
  }

  getToken(): string | null {
    return localStorage.getItem('authToken')
  }

  makeComment() {
    const body = {
      description: this.description,
    }

    const token = this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })

    const options = { headers }

    console.log(body)

    this.http
      .post('http://34.105.66.254:1923/comment/' + this.pollId, body, options)
      .subscribe(
        (response) => {
          console.log('Comment created', response)
          window.location.reload()
        },
        (error) => {
          console.error('Error creating comment', error)
        },
      )
  }
}
