import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../auth.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-user-pending-requests',
  templateUrl: './user-pending-requests.component.html',
  styleUrls: ['./user-pending-requests.component.css']
})
export class UserPendingRequestsComponent {polls!: any[]
  options!: any


  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,) {
      this.options=this.authService.getHeaders()
    this.onPollCreationReq()
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
    this.http.get('http://34.105.66.254:1923/poll/my-polls/pending',this.options).subscribe(
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

  deletePoll(pollId: any) {
    console.log(pollId);
    this.http.delete('http://34.105.66.254:1923/poll/' + pollId, this.options).subscribe(
      (response: any) => {
        // Remove the deleted poll from the local array
        this.polls = this.polls.filter(poll => poll.id !== pollId);
        console.log('Poll deleted successfully.');
      },
      (error) => {
        console.error('Error deleting poll:', error);
      },
      () => {
        // This block will be executed after the request completes (whether success or error)
        // Reload the data here
        this.loadData();
      }
    );
  }
  
  // Move the code for fetching data to a separate method
  loadData() {
    this.http.get('http://34.105.66.254:1923/poll/my-polls/', this.options).subscribe(
      (response: any) => {
        this.polls = response;
  
        this.polls.forEach(poll => {
          poll.creation_date = this.formatDateTime(new Date(poll.creation_date));
        });
  
        console.log('Fetched polls:', this.polls);
      },
      (error) => {
        console.error('Error fetching polls:', error);
      }
    );
  }
  

  onOutcomeVerifiationReq(){
    this.polls = []
  }

}
