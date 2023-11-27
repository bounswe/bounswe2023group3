import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-moderator-requests',
  templateUrl: './moderator-requests.component.html',
  styleUrls: ['./moderator-requests.component.css'],
})
export class ModeratorRequestsComponent {
  polls!: any[]

  constructor(private http: HttpClient) {
    this.http.get('http://34.105.66.254:1923/moderator/polls/').subscribe(
      (response: any) => {
        this.polls = response
        console.log('Fetched polls:', this.polls)
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }
}
