import { HttpClient } from '@angular/common/http';
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
  token!: any
  due_date!: any
  options: any[] = [];
  tags: any[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { 
    this.token=this.authService.getHeaders()
  }
    
    ngOnInit() {
      this.route.params.subscribe((params) => {
        this.pollId = params['pollId']
      })

      
    this.http.get('http://34.105.66.254:1923/poll/' + this.pollId).subscribe(
      (response: any) => {
        this.username = response.creator.username
        this.question = response.question
        this.options = response.options
        this.tags = response.tags
        this.due_date = this.formatDateTime(new Date(response.due_date))
      },
      (error) => {
        console.error('Error fetching poll:', error)
      },
    )
    }

    onApprove(){
      this.http.post('http://34.105.66.254:1923/moderator/approve'+this.pollId,{'approveStatus': true},this.token).subscribe(
        (response: any) => {
        },
        (error) => {
          console.error('Error deleting poll:', error)
        },
      )
    }
    onReject(){
      this.http.post('http://34.105.66.254:1923/moderator/approve'+this.pollId,{'approveStatus': false, 
      "poll_request_rejection_feedback": "not a precise poll"}, this.token).subscribe(
        (response: any) => {
        },
        (error) => {
          console.error('Error deleting poll:', error)
        },
      )

      this.http.delete('http://34.105.66.254:1923/poll/'+this.pollId,this.token).subscribe(
        (response: any) => {
        },
        (error) => {
          console.error('Error deleting poll:', error)
        },
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
