import { HttpClient } from '@angular/common/http'
import { Component, Input } from '@angular/core'
import { environment } from 'src/environments/environment'


@Component({
  selector: 'app-badges-bar',
  templateUrl: './badges-bar.component.html',
  styleUrls: ['./badges-bar.component.css'],
})
export class BadgesBarComponent {
  @Input() userId!: string
  badges!: any
  apiUrl = environment.apiBaseUrl;
  

  colors: string[] = [
    '#f2545b',
    '#276fbf',
    '#585191',
    '#da9f93',
    '#c5d86d',
    '#e57f84',
  ]
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.apiUrl + '/user/' + this.userId).subscribe(
      (response: any) => {
        this.badges = response.badges
      },
      (error) => {
        console.error('Error fetching poll:', error)
      },
    )
  }

  getColor(i: number): string {
    return this.colors[i % this.colors.length]
  }
}
