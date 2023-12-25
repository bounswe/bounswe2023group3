import { HttpClient } from '@angular/common/http'
import { Component, Input, EventEmitter, Output } from '@angular/core'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  polls!: any[]
  following!: any[]
  leaders!: any[]
  isAuthenticated: boolean = false
  clickedButton: string = '';
  settledMode!: boolean
  options!: any
  query!: string
  settleEnum!: number
  user_id!: any


  constructor(private http: HttpClient,private authService: AuthService) {
    this.options = this.authService.getHeaders();
    this.settledMode = false

    this.followingPolls(this.settledMode)

    this.http.get('http://34.105.66.254:1923/ranking/0493fe16-9536-46d9-98cd-bbf1c6e8bd12',this.authService.getHeaders()).subscribe(
      (response: any) => {
        this.leaders = response.ranking
        console.log(this.leaders)
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )

    
  }

  @Output() toggleChange = new EventEmitter<boolean>();
  isChecked = false;

  onToggleChange(): void {
    this.settledPolls(this.settledMode)
    this.isChecked = !this.settledMode;
    this.toggleChange.emit(this.isChecked);
   
  }
  ngOnInit() {
    this.settledMode = false
    this.user_id = localStorage.getItem('user_id')
    if (localStorage.getItem('user_id')) {
      this.isAuthenticated = true
    }
  }

  settledPolls(isSettled: boolean) {
    this.isChecked = isSettled
    this.settledMode = isSettled

    if (this.clickedButton == 'trending') {
      this.trendingPolls(isSettled)

    } else if (this.clickedButton == 'following') {
      this.followingPolls(isSettled)
    }
  }

  trendingPolls(isChecked: boolean) {
    if (isChecked) {
      this.settleEnum = 2
    } else {
      this.settleEnum = 0
    }
    this.clickedButton = 'trending';
    this.http.get('http://34.105.66.254:1923/poll/not-voted-by-me/?is_settled=' + this.settleEnum, this.options).subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    
  }

  followingPolls(isChecked: boolean) {
    this.clickedButton = 'following';
    if (isChecked) {
      this.http.get('http://34.105.66.254:1923/poll/?followedById=' + this.user_id + "&is_settled=" + 2 ,this.options).subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )

    } else {

      this.http.get('http://34.105.66.254:1923/poll/my-followings',this.options).subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    }
    
  }

  semanticSearchPolls(query: string){
    console.log("Semantic")
    this.clickedButton = ''
    const payload = 
    {
      query
    }
    this.http.post("http://34.105.66.254:1923/poll/pinecone/search", payload,this.options).subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )

  }
}
