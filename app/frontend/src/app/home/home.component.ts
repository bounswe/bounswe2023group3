import { HttpClient } from '@angular/common/http'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  polls!: any[]

  constructor(private http: HttpClient) {
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {
        this.polls = response
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
  }

  ngOnInit() {}
  
  settledPolls(isSettled:boolean){
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {

        this.polls = []
        for (const r of response) { 
          if (r.is_settled === false && !isSettled) {
            this.polls.push(r); 
          }
          if (r.is_settled === true && isSettled) {
            this.polls.push(r); 
          }
        }
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    
  }

  trendingPolls(){
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {

        this.polls = []
        for (const r of response) { 
          for(const t of r.tags){
            if (t.name === "Trending") {
              this.polls.push(r); 
            }
          }
        }
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    
  }
  followingPolls(){
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {

        this.polls = []
        for (const r of response) { 
              this.polls.push(r); 
            }
          
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    
  }

}
