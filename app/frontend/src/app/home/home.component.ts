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


  constructor(private http: HttpClient,private authService: AuthService) {
    this.options = this.authService.getHeaders();
    this.settledMode = false

    this.http.get('http://34.105.66.254:1923/poll/?approveStatus=true').subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )

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
    if (localStorage.getItem('user_id')) {
      this.isAuthenticated = true
    }
  }

  settledPolls(isSettled: boolean) {
    this.http.get('http://34.105.66.254:1923/poll/?approveStatus=true').subscribe(
      (response: any) => {
        this.polls = []
        for (const r of response) {
          if (!r.is_settled && !isSettled) {
            this.polls.push(r)
            this.settledMode = false
          }
          if (r.is_settled==2 && isSettled) {
            this.polls.push(r)
            this.settledMode = true
          }
        }
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }

  trendingPolls() {
    this.clickedButton = 'trending';
    this.settledMode = false
    this.http.get('http://34.105.66.254:1923/poll/?tags='+['Trending']+'&?approveStatus=true').subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    
    this.isChecked = this.settledMode;
    this.toggleChange.emit(this.isChecked);
  }

  followingPolls() {
    this.clickedButton = 'following';
    this.settledMode = false
    this.http.get('http://34.105.66.254:1923/poll/my-followings',this.options).subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    
    this.isChecked = this.settledMode;
    this.toggleChange.emit(this.isChecked);
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
