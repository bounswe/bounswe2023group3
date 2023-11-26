import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  polls!: any[]
  user_id!: any
  username: any

  constructor(private http: HttpClient) {
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {
        this.polls = []
        console.log(this.user_id)
        for (const r of response) { 
              if(r.creator.id == this.user_id){
                this.polls.push(r); 
              }
            }
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    this.user_id = localStorage.getItem('user_id')
    this.username = localStorage.getItem('username')
  }
  createdPolls(){
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {

        this.polls = []
        for (const r of response) { 
              if(r.creator.id == this.user_id){
                this.polls.push(r); 
              }
            }
          
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    
  }
  likedPolls(){
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
  votedPolls(){
    this.http.get('http://34.105.66.254:1923/poll/').subscribe(
      (response: any) => {

        this.polls = []
          
      },
      (error) => {
        console.error('Error fetching polls:', error)
      },
    )
    
  }
}
