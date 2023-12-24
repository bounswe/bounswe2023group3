import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-leaderboard-bar',
  templateUrl: './leaderboard-bar.component.html',
  styleUrls: ['./leaderboard-bar.component.css'],
})
export class LeaderboardBarComponent {
  @Input() leaders!: any[]

}
