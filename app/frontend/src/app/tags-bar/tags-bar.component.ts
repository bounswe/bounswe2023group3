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
    '#EDDEA4',
    '#F7A072',
    '#e57f84',
    '#876194',
    '#076D9C',
    '#00665E',
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
      { name: 'movies' },
      { name: 'weather' },
      { name: 'football' },
      { name: 'sports' },
      { name: 'music' },
      { name: 'tv shows' },
      { name: 'finance' },
      { name: 'basketball' },
      { name: 'tv series' },
      { name: 'fashion' },
      { name: 'magazine' },
      { name: 'games' },
      { name: 'computer science' },
      { name: 'entertainment' },
      { name: 'anime' },
      { name: 'technology' },
      { name: 'books' },
      { name: 'literature' },
      { name: 'education' },
      { name: 'business' },
      { name: 'video games' },
    ]
  }

  getColor(i: number): string {
    return this.colors[i % this.colors.length]
  }

  goToTag(tagName: string,tagId: string) {
    this.router.navigate(['/app-tag-page', tagName, tagId])
  }
}
