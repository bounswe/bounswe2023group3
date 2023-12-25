import { HttpClient } from '@angular/common/http'
import { Component, Input, NgModule } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/services/user-service/user.service'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { ConfirmModelComponent } from '../confirm-model/confirm-model.component'
import { UserSettleRequestComponent } from '../user-settle-request/user-settle-request.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReportUserComponent } from '../report-user/report-user.component'
import { AuthService } from '../auth.service'
import { User } from '../user-profile/user.model'
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
})
export class PollComponent {
  @Input() pollId!: string
  image_urls: string[] = []
  selectedButton: HTMLButtonElement | null = null
  question!: string
  tags!: any[]
  options!: any[]
  due_date!: string
  comment_count!: number
  creation_time!: string
  vote_count!: number
  creator!: User
  isSettled!: boolean 
  isLikedBy!: boolean
  nofLikes: number = 0
  userId!: string | null
  optionWeights!: number[]
  optionWeightsScaled: number[] = []

  //TODO: retrieve user vote & show in html
  userVoted!: boolean 
  user_vote_id !: string

  showPopup = false
  isAuthenticated: boolean = false

  outcome: string = ''
  outcomeSource: string = ''

  annotations: any[] =[]

  colors: string[] = [
    '#AEEEEE',
    '#E6E6FA',
    '#FADADD',
    '#F08080',
    '#B0C4DE',
    '#FFB6C1',
    '#D7907B',
    '#C1EEFF',
    '#F7A072',
    '#9BA0BC',
    '#F88DAD',
    '#EDDEA4',
    '#BFCC94',
  ]

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {
  }

  

  ngOnInit() {

    this.http.get('http://34.105.66.254:1938/annotation?pollIDs=http%3A%2F%2F34.105.66.254%3A1923%2F'+this.pollId).subscribe(
      (response: any) => {
        this.annotations=response.annotations;
      },
      (error) => {
        console.error('Error fetching poll:', error);
      }
    );

    this.http.get('http://34.105.66.254:1923/poll/'+this.pollId).subscribe(
    (response: any) => {
      this.question = response.question;
      this.tags = response.tags;
      this.options = response.options;
      this.due_date = this.formatDateTime(new Date(response.due_date));
      this.vote_count = response.voteCount;
      this.creator = response.creator;
      this.image_urls = response.image_urls;
      this.user_vote_id = response.votedOption.id;
      this.isSettled = (response.is_settled != 0);
      this.userVoted = !(!this.user_vote_id);
      this.optionWeights = response.voteDistribution.map((x: {id: string, count: string }) => parseInt(x.count));
      const sum = this.optionWeights.reduce((accumulator, current) => accumulator + current, 0);
      this.optionWeightsScaled  = this.optionWeights.map(weight => (weight / sum) * 100);
    },
    (error) => {
      console.error('Error fetching poll:', error);
    }
  );
    this.userId = localStorage.getItem('user_id')
    if (this.userId) {
      this.isAuthenticated = true
    }
    this.http.get('http://34.105.66.254:1923/poll/' + this.pollId).subscribe(
      (response: any) => {
        this.question = response.question
        this.tags = response.tags
        this.options = response.options

        this.due_date = this.formatDateTime(new Date(response.due_date))
        this.vote_count = response.vote_count

        this.creator = response.creator

          if(!this.creator.firstname) this.creator.firstname=""
          if(!this.creator.lastname) this.creator.lastname=""

        const time_dif =
          (new Date().valueOf() - new Date(response.creation_date).valueOf()) /
          1000

        if (time_dif < 60) {
          this.creation_time = Math.floor(time_dif) + 's'
        } else if (time_dif / 60 < 60) {
          this.creation_time = Math.floor(time_dif / 60) + 'm'
        } else if (time_dif / 3600 < 24) {
          this.creation_time = Math.floor(time_dif / 3600) + 'h'
        } else {
          this.creation_time = Math.floor(time_dif / (3600 * 24)) + 'd'
        }
      },
      (error) => {
        console.error('Error fetching poll:', error)
      },
    )
    this.userService
      .getLikedUserIds(this.pollId)
      .then((likedUsersList: string[]) => {
        if (!likedUsersList) {
          this.isLikedBy = false
        } else {
          if (this.userId) {
            this.isLikedBy = likedUsersList.includes(this.userId)
            this.nofLikes = likedUsersList.length
          }
        }
      })

    this.http.get('http://34.105.66.254:1923/comment/' + this.pollId).subscribe(
      (response: any) => {
        this.comment_count = response.length
      },
      (error) => {
        console.error('Error fetching comment count:', error)
      }
      )

    if (this.user_vote_id) {
      this.selectedButton = document.getElementById(
        this.user_vote_id
      ) as HTMLButtonElement
      if (true) {
        this.selectedButton.classList.add('clicked')
      }
    }
    
    //scale votes
    
  }
  showVote(){
    if (!this.user_vote_id)
    {

    }

  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmModelComponent, {
      width: '400px', height: '200px'
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        console.log('User confirmed deletion')
        this.deletePoll()
      } else {
        console.log('User canceled deletion')
      }
    }
    )
  }

  reportUser(): void {
    const dialogRef = this.dialog.open(ReportUserComponent, {
      width: '400px',
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sendUserReport(result.reason)
      } else {
      }
    })
  }

  settleRequestForm(): void {
    const dialogRef = this.dialog.open(UserSettleRequestComponent, {
      width: '400px',
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.outcome = result.outcome
        this.outcomeSource = result.outcomeSource
        this.settlePollRequest()
      } else {
      }
    })
  }

  formatDateTime(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  castVote(optionId: string, buttonRef: HTMLButtonElement) {
    if (!this.userVoted)
    {
      this.toggleButton(buttonRef);  // Handle UI change
    this.userService.vote(optionId)            // Submit the vote
      .then(response => {
        // Handle the response
        console.log('Vote cast for option ID:', optionId);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error casting vote:', error);
      });
    }
    this.userVoted = true;   
  }

  toggleButton(button: HTMLButtonElement) {
    button.classList.add('clicked');
    /*
    if (this.selectedButton === button) {
      this.selectedButton.classList.remove('clicked')
      this.selectedButton = null
      localStorage.removeItem('selectedButtonId')
    } else {
      if (this.selectedButton) {
        this.selectedButton.classList.remove('clicked')
      }

      button.classList.add('clicked')
      this.selectedButton = button

      localStorage.setItem('selectedButtonId', button.id)
    }
    */
  }

  toggleLike(): void {
    if (this.isLikedBy) {
      this.userService.unlike(this.pollId)
      this.nofLikes -= 1
    } else {
      this.userService.like(this.pollId)
      this.nofLikes += 1
    }
    this.isLikedBy = !this.isLikedBy //change the like status
  }

  goToTag(tagName: string) {
    this.router.navigate(['/app-tag-page', tagName])
  }

  navigateToProfile(user: string) {
    if (user == localStorage.getItem('username')) {
      this.router.navigate(['/app-user-profile'])
    } else this.router.navigate(['/app-profile', user])
  }

  navigateToPoll() {
    this.router.navigate(['/app-poll-view', this.pollId])
  }

  getColor(i: number): string {
    return this.colors[i % this.colors.length]
  }

  openPopup() {
    this.showPopup = !this.showPopup
  }

  deletePoll() {
    this.http.delete('http://34.105.66.254:1923/poll/' + this.pollId).subscribe(
      () => {
        console.log(`Poll deleted successfully.`)
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

  settlePollRequest() {
    const body = {
      'outcome': this.outcome,
      'outcome_source': this.outcomeSource,
    }

    this.http
      .post('http://34.105.66.254:1923/poll/settle-request/' + this.pollId, body, this.authService.getHeaders())
      .subscribe(
        () => {
          console.log(`Request sent ccessfully.`)
        },
        (error) => {
          console.error('Error sending request:', error)
        },
      )
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

  isCurrentUserCreator(): boolean {
    // Check if there is a valid userId and creator, and if their ids match
    return this.userId === this.creator.id;
  }

}
