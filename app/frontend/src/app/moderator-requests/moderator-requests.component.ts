import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { environment } from 'src/environments/environment'


@Component({
  selector: 'app-moderator-requests',
  templateUrl: './moderator-requests.component.html',
  styleUrls: ['./moderator-requests.component.css'],
})
export class ModeratorRequestsComponent {
  polls!: any[]
  options!: any
  outcomeReq: boolean = false
  activeButton: string | null = null;
  apiUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,) {
      this.options=this.authService.getHeaders()
    this.http.get(this.apiUrl + '/moderator/polls/',this.options).subscribe(
      (response: any) => {
        this.polls = response
        this.activeButton = "PollCreationRequests"
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
    this.activeButton = 'PollCreationRequests';
    this.http.get(this.apiUrl + '/moderator/polls/',this.options).subscribe(
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
      this.http.post(this.apiUrl + '/poll/settle/'+pollId,
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

    this.http.delete(this.apiUrl + '/poll/'+pollId,this.options).subscribe(
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
    this.activeButton = 'OutcomeVerificationRequests';
    this.http.get(this.apiUrl + '/poll/').subscribe(
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
