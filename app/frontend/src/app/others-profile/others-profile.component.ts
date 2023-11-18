import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core'

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.component.html',
  styleUrls: ['./others-profile.component.css'],
})
export class OthersProfileComponent {
  polls!: any[]

  constructor(private http: HttpClient) {
    this.http
    .get('http://34.105.66.254:1923/poll/')
    .subscribe(
      (response: any) => {
        this.polls =   response
      },
      (error) => {
        console.error('Error fetching polls:', error);
      }
    );
  }
}
