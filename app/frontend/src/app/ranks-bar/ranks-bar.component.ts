import { HttpClient } from '@angular/common/http'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-ranks-bar',
  templateUrl: './ranks-bar.component.html',
  styleUrls: ['./ranks-bar.component.css'],
})
export class RanksBarComponent {
  @Input() userId!: string
  ranks!: any

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
    this.http.get('http://34.105.66.254:1923/user/' + this.userId).subscribe(
      (response: any) => {
        this.ranks = response.rankings
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
