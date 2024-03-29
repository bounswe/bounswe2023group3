import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-moderator-poll-review',
  templateUrl: './moderator-poll-review.component.html',
  styleUrls: ['./moderator-poll-review.component.css'],
})
export class ModeratorPollReviewComponent {

  pollId!: any
  username!: string
  question!: string
  description!: string
  token!: any
  due_date!: any
  options: any[] = [];
  tags: any[] = [];
  is_settled!: number
  outcome!: any
  outcome_source!: any
  apiUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router, 
  ) { 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    })
    this.token={ headers }
  }
    
    ngOnInit() {
      this.route.params.subscribe((params) => {
        this.pollId = params['pollId']
      })

      
    this.http.get(this.apiUrl + '/poll/' + this.pollId).subscribe(
      (response: any) => {
        this.username = response.creator.username
        this.question = response.question
        this.description = response.description
        this.options = response.options
        this.tags = response.tags
        this.due_date = this.formatDateTime(new Date(response.due_date))
        this.is_settled = response.is_settled
        this.outcome_source = response.outcome_source
        if(this.is_settled){
          this.http.get(this.apiUrl + '/option/' + response.outcome ).subscribe(
            (outcomeResponse: any) => {
                  this.outcome = outcomeResponse.answer
            },
            (error) => {
              console.error('Error fetching poll:', error)
            },
          )
        }
      },
      (error) => {
        console.error('Error fetching poll:', error)
      },
    )
    }

    onApprove(){
      if(this.is_settled==1){
          this.http.post(this.apiUrl + '/poll/settle/'+this.pollId,{'decision': true,
        'settle_poll_request_feedback': "xx"},this.token).subscribe(
          (response: any) => {
          },
          (error) => {
            console.error('Error approving poll:', error)
          },
        )
        return
      }

      this.http.post(this.apiUrl + '/moderator/approve/'+this.pollId,{'approveStatus': true},this.token).subscribe(
        (response: any) => {
        },
        (error) => {
          console.error('Error approving poll:', error)
        },
        () => {
          // Redirect after completing the request
          this.router.navigate(['/app-moderator-requests']);
        }
      )
    }
    onReject(){
      
    if(this.is_settled==1){
      this.http.post(this.apiUrl + '/poll/settle/'+this.pollId,
      {
        "decision": false,
        "settle_poll_request_feedback": "not a good to time to settle it"
      },this.token).subscribe(
        (response: any) => {
        },
        (error) => {
          console.error('Error deleting poll:', error)
        },
        () => {
          // Redirect after completing the request
          this.router.navigate(['/app-moderator-requests']);
        }
      )
      return
    }

      this.http.post(this.apiUrl + '/moderator/approve/'+this.pollId,{'approveStatus': false, 
      "poll_request_rejection_feedback": "not a precise poll"}, this.token).subscribe(
        (response: any) => {
        },
        (error) => {
          console.error('Error deleting poll:', error)
        },
      )

      this.http.delete(this.apiUrl + '/poll/'+this.pollId,this.token).subscribe(
        (response: any) => {
        },
        (error) => {
          console.error('Error deleting poll:', error)
        },
        () => {
          // Redirect after completing the request
          this.router.navigate(['/app-moderator-requests']);
        }
      )
    }
    
    formatDateTime(date: Date): string {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
    
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
}
