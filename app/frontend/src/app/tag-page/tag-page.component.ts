import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { AuthService } from '../auth.service'
import { environment } from 'src/environments/environment'


@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.css'],
})
export class TagPageComponent {
  polls!: any[]
  tagName: string = ''
  tagId: string = ''
  leaders!: any[]

  apiUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tagName = params['tagName']
      this.http.get(this.apiUrl + '/poll/?tags=' + [String(this.tagName)]+"&?approveStatus=true").subscribe(
        (response: any) => {
          this.polls = response
        },
        (error) => {
          console.error('Error fetching data:', error)
        },
      )

      this.tagId = params['tagId']
      this.http.get(this.apiUrl + '/ranking/'+this.tagId,this.authService.getHeaders()).subscribe(
        (response: any) => {
          this.leaders = response.ranking
          console.log(this.leaders)
        },
        (error) => {
          console.error('Error fetching polls:', error)
        },
      )
    })

  }
}
