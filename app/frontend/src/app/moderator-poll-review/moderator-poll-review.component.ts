import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-moderator-poll-review',
  templateUrl: './moderator-poll-review.component.html',
  styleUrls: ['./moderator-poll-review.component.css'],
})
export class ModeratorPollReviewComponent {

  pollId!: any
  username!: string
  question!: string
  options!: any
  is_settled!: number
  outcome!: any

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    })
    this.options={ headers }
  }
    
    ngOnInit() {
      this.route.params.subscribe((params) => {
        this.pollId = params['pollId']
      })

      
    this.http.get('http://34.105.66.254:1923/poll/' + this.pollId).subscribe(
      (response: any) => {
        this.username = response.creator.username
        this.question = response.question
        this.is_settled = response.is_settled
        this.outcome = response.outcome
      },
      (error) => {
        console.error('Error fetching poll:', error)
      },
    )
    }

    onApprove(){
      if(this.is_settled==1){
          this.http.post('http://34.105.66.254:1923/poll/settle/'+this.pollId,{'decision': true,
        'settle_poll_request_feedback': "xx"},this.options).subscribe(
          (response: any) => {
          },
          (error) => {
            console.error('Error approving poll:', error)
          },
        )
        return
      }

      this.http.post('http://34.105.66.254:1923/moderator/approve/'+this.pollId,{'approveStatus': true},this.options).subscribe(
        (response: any) => {
        },
        (error) => {
          console.error('Error approving poll:', error)
        },
      )
    }
    onReject(){
      this.http.post('http://34.105.66.254:1923/moderator/approve/'+this.pollId,{'approveStatus': false, 
      "poll_request_rejection_feedback": "not a precise poll"}, this.options).subscribe(
        (response: any) => {
        },
        (error) => {
          console.error('Error deleting poll:', error)
        },
      )

      this.http.delete('http://34.105.66.254:1923/poll/'+this.pollId,this.options).subscribe(
        (response: any) => {
        },
        (error) => {
          console.error('Error deleting poll:', error)
        },
      )
    }
}
