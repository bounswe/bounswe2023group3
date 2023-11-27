import { HttpClient } from '@angular/common/http'
import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

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
  ) {}

  ngOnInit() {
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
