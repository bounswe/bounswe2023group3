import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../auth.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-moderator-requests',
  templateUrl: './moderator-requests.component.html',
  styleUrls: ['./moderator-requests.component.css'],
})
export class ModeratorRequestsComponent {
  polls!: any[]
  options!: any
  outcomeReq: boolean = false


  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,) {
      this.options=this.authService.getHeaders()
    this.http.get('http://34.105.66.254:1923/moderator/polls/',this.options).subscribe(
      (response: any) => {
        this.polls = response

        this.polls.forEach(poll => {
          poll.creation_date = this.formatDateTime(new Date(poll.creation_date))
        });

        console.log('Fetched polls:', this.polls)
      },
      (error) => {
        console.error('Error fetching polls:', error)
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

  onPollCreationReq(){
    this.outcomeReq = false
    this.http.get('http://34.105.66.254:1923/moderator/polls/',this.options).subscribe(
      (response: any) => {
        this.polls = response
        this.polls.forEach(poll => {
          poll.creation_date = this.formatDateTime(new Date(poll.creation_date))
        });
        console.log('Fetched polls:', this.polls)
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }

  handleDisapprove(pollId: any){

    if(this.outcomeReq){
      this.http.post('http://34.105.66.254:1923/poll/settle/'+pollId,
      {
        "decision": false,
        "settle_poll_request_feedback": "not a good to time to settle it"
      },this.options).subscribe(
        (response: any) => {
        },
        (error) => {
          console.error('Error deleting poll:', error)
        },
        () => {
          // Reload after settling the poll
          window.location.reload();
        }
      )
      
      return
    }

    this.http.delete('http://34.105.66.254:1923/poll/'+pollId,this.options).subscribe(
      (response: any) => {
      },
      (error) => {
        console.error('Error deleting poll:', error)
      },
      () => {
        // Reload after settling the poll
        window.location.reload();
      }
    )
    
  }

  onOutcomeVerifiationReq(){
    this.outcomeReq = true
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {

        this.polls = []
        for (const r of response) { 
          if (r.is_settled === 1) {
            r.creation_date = this.formatDateTime(new Date(r.creation_date))
            this.polls.push(r); 
          }
        }
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }

  

  navigateToDetailedView(pollId: any) {
    this.router.navigate(['/app-moderator-poll-review', pollId])
  }
}
