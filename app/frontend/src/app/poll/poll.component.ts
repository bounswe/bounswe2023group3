import { HttpClient } from '@angular/common/http'
import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/services/user-service/user.service'

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
})
export class PollComponent {
  @Input() pollId!: string
  selectedButton: HTMLButtonElement | null = null
  question!: string
  tags!: any[]
  options!: any[]
  due_date!: string
  comment_count!: number
  vote_count!: number
  creator!: string
  isLikedBy!: boolean
  nofLikes: number = 0
  userId!: string | null

  colors: string[] = [
    '#AEEEEE',
    '#FFDAB9', 
    '#E6E6FA', 
    '#98FB98', 
    '#FADADD', 
    '#F08080', 
    '#B0C4DE', 
    '#FFB6C1'  
];

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem("user_id");
    this.http.get('http://34.105.66.254:1923/poll/' + this.pollId).subscribe(
      (response: any) => {
        this.question = response.question
        this.tags = response.tags
        this.options = response.options
        this.due_date = response.due_date
        this.comment_count = response.comment_count
        this.vote_count = response.vote_count
        this.creator = response.creator.username
      },
      (error) => {
        console.error('Error fetching poll:', error)
      },
    )
    this.userService.getLikedUserIds(this.pollId).then((likedUsersList: string[]) => {
      if(!likedUsersList){
        this.isLikedBy = false;
      }
      else{
        if(this.userId){
          this.isLikedBy = likedUsersList.includes(this.userId);
          this.nofLikes = likedUsersList.length;  
        }
      }
    })
         
  
    const selectedButtonId = localStorage.getItem('selectedButtonId')
    if (selectedButtonId) {
      this.selectedButton = document.getElementById(
        selectedButtonId,
      ) as HTMLButtonElement
      if (this.selectedButton) {
        this.selectedButton.classList.add('clicked')
      }
    }
  }

  toggleButton(button: HTMLButtonElement) {
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
  }
  
  toggleLike(): void {
      if (this.isLikedBy) {
        this.userService.unlike(this.pollId);
        this.nofLikes -= 1;
      } else {
        this.userService.like(this.pollId);
        this.nofLikes += 1;
      }
      this.isLikedBy = !this.isLikedBy; //change the like status
  }
  
 
  goToTag(tagName: string){
    this.router.navigate(['/app-tag-page', tagName])
  }

  navigateToProfile(user: string) {
    if(user == localStorage.getItem('username')){
      this.router.navigate(['/app-user-profile'])
    }
    else this.router.navigate(['/app-profile', user])
  }

  navigateToPoll() {
    this.router.navigate(['/app-poll-view', this.pollId])
  }
  
  getColor(i: number):string{
  return this.colors[i % this.colors.length] 
  }
}
