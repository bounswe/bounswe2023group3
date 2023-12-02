import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-tags-bar',
  templateUrl: './tags-bar.component.html',
  styleUrls: ['./tags-bar.component.css'],
})
export class TagsBarComponent {
  tags!: any

  colors: string[] = [
    '#e57f84',
    '#b4869f',
    '#30568f',
    '#c64191',
    '#d7907b',
    '#f9c784',
  ]
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    /*this.http.get('http://34.105.66.254:1923/tag/').subscribe(
      (response: any) => {
        this.tags = response.slice(0, 7); //most used 7 should be given + maybe dropdown
      },
      (error) => {
        console.error('Error fetching poll:', error)
      },
    )*/
    this.tags = [
      { name: 'Movies' },
      { name: 'Football' },
      { name: 'Sports' },
      { name: 'Music' },
      { name: 'TV Shows' },
      { name: 'Finance' },
    ]
  }

  getColor(i: number): string {
    return this.colors[i % this.colors.length]
  }

  goToTag(tagName: string) {
    this.router.navigate(['/app-tag-page', tagName])
  }
}
