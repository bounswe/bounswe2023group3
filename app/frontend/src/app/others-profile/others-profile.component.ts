import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.component.html',
  styleUrls: ['./others-profile.component.css'],
})
export class OthersProfileComponent implements OnInit {
  polls: any[] = [];
  user: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        const usernameToFetch = params['username'];
        return this.http.get('http://34.105.66.254:1923/user/username/' + usernameToFetch);
      })
    ).subscribe(
      (response: any) => {
        this.user = response;

        this.http.get('http://34.105.66.254:1923/poll/' + '?creatorId=' + this.user.id).subscribe(
          (pollsResponse: any) => {
            this.polls = pollsResponse;
          },
          (pollsError) => {
            console.error('Error fetching polls:', pollsError);
          }
        );
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }
}
