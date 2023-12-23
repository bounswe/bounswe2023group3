import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ReportUserComponent } from '../report-user/report-user.component'
import { MatDialog } from '@angular/material/dialog'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.css'],
})
export class PollViewComponent {
  pollId!: string
  comments!: any[]
  description!: string
  isAuthenticated: boolean = false
  showPopup = false
  userId: string | null = localStorage.getItem('user_id');
  isSettled!: boolean
  comment_time!: string

  selectedCommentId: string | null = null
  creator: any
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {
    
  }

  ngOnInit() {
    this.http.get('http://34.105.66.254:1923/poll/'+this.pollId).subscribe(
      (response: any) => {
        this.creator = response.creator;
      },
      (error) => {
        console.error('Error fetching poll:', error);
      }
    );

    if (localStorage.getItem('user_id')) {
      this.isAuthenticated = true
    }
    this.route.params.subscribe((params) => {
      this.pollId = params['pollId']
    })

    this.http.get('http://34.105.66.254:1923/poll/' + this.pollId).subscribe(
      (response: any) => {
        if(response.is_settled!=0){
          this.isSettled = true
        }
        else this.isSettled = false
      },
      (error) => {
        console.error('Error fetching poll:', error)
      },
    )
    this.http.get('http://34.105.66.254:1923/comment/' + this.pollId).subscribe(
      (response: any) => {
        this.comments = response

        this.comments.forEach(comment => {
          const timeDiff = (new Date().valueOf() - new Date(comment.created_date).valueOf()) / 1000;
    
          if (timeDiff < 60) {
            comment.created_date = Math.floor(timeDiff) + 's';
          } else if (timeDiff / 60 < 60) {
            comment.created_date = Math.floor(timeDiff / 60) + 'm';
          } else if (timeDiff / 3600 < 24) {
            comment.created_date = Math.floor(timeDiff / 3600) + 'h';
          } else {
            comment.created_date = Math.floor(timeDiff / (3600 * 24)) + 'd';
          }
        });
      
      },
      (error) => {
        console.error('Error fetching poll:', error)
      },
    )
  }

  reportUser(): void {
    const dialogRef = this.dialog.open(ReportUserComponent, {
      width: '300px',
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sendUserReport(result.reason)
      } else {
      }
    })
  }

  sendUserReport(rsn : string) {
   

    const body = {
      'reason': rsn,
    }

    console.log(rsn)

    this.http
      .post('http://34.105.66.254:1923/user/report/' + this.creator.id, body, this.authService.getHeaders())
      .subscribe(
        () => {
          console.log(`Request sent successfully.`)
        },
        (error) => {
          console.error('Error sending request:', error)
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

  deleteComment(commentId: string) {
    const token = this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })

    const options = { headers }

    this.http
      .delete(`http://34.105.66.254:1923/comment/${this.pollId}`, options)
      .subscribe(
        (response) => {
          console.log('Comment deleted', response)
          // Remove the deleted comment from the local array
          this.comments = this.comments.filter(
            (comment) => comment.id !== commentId,
          )
        },
        (error) => {
          console.error('Error deleting comment', error)
        },
      )
  }

  openPopup(commentId: string) {
    if (this.selectedCommentId === commentId) {
      // Clicked on the same comment, close the popup
      this.showPopup = !this.showPopup
    } else {
      // Clicked on a different comment, open the popup
      this.selectedCommentId = commentId
      this.showPopup = true
    }
  }

  isPopupOpen(commentId: string): boolean {
    return this.showPopup && this.selectedCommentId === commentId
  }

  isCommentOwner(commentUserId: string): boolean {
    return this.userId === String(commentUserId);
  }
}
