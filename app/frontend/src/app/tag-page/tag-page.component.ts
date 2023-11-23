import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.css']
})
export class TagPageComponent {
  polls!: any[]

  constructor(private http: HttpClient,private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const tagName = params['tagName'];
    
      this.http.get(`http://34.105.66.254:1923/poll`).subscribe(
        (pollsResponse: any) => {
          this.polls = [];
          const tagName = this.route.snapshot.params['tagName']; 
          for (const r of pollsResponse) {
            for (const t of r.tags) {
              if (t.name === tagName) {
                this.polls.push(r);
              }
            }
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    });

  }

}
