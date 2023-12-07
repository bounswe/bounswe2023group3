import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.css'],
})
export class TagPageComponent {
  polls!: any[]
  tagName: string = ''

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tagName = params['tagName']
      this.http.get('http://34.105.66.254:1923/poll/?tags=' + [String(this.tagName)]+"&?approveStatus=true").subscribe(
        (response: any) => {
          this.polls = response
        },
        (error) => {
          console.error('Error fetching data:', error)
        },
      )
    })
  }
}
