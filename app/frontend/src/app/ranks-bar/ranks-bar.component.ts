import { HttpClient } from '@angular/common/http'
import { Component, Input } from '@angular/core'
import { AuthService } from '../auth.service'
import { environment } from 'src/environments/environment'


@Component({
  selector: 'app-ranks-bar',
  templateUrl: './ranks-bar.component.html',
  styleUrls: ['./ranks-bar.component.css'],
})
export class RanksBarComponent {
  ranks!: any

  apiUrl = environment.apiBaseUrl;

  colors: string[] = [
    '#EDDEA4',
    '#F7A072',
    '#e57f84',
    '#876194',
    '#076D9C',
    '#00665E',
  ]
  constructor(private http: HttpClient,private authService: AuthService,) {
  }

  ngOnInit() {
    this.http.get(this.apiUrl + '/ranking/my-rankings', this.authService.getHeaders()).subscribe(
      (response: any) => {
        console.log(response)
        this.ranks = response
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
