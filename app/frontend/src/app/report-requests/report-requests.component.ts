import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report-requests',
  templateUrl: './report-requests.component.html',
  styleUrls: ['./report-requests.component.css']
})
export class ReportRequestsComponent {
  reports!: any[]
  options!: any

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router,) {
      this.options=this.authService.getHeaders()
    this.http.get('http://34.105.66.254:1923/moderator/reports/',this.options).subscribe(
      (response: any) => {
        this.reports = response
        this.reports.forEach(report => {
          report.creation_date = this.formatDateTime(new Date(report.creation_date))
        });
        console.log('Fetched reports:', this.reports)
      },
      (error) => {
        console.error('Error fetching reports:', error)
      },
    )

  }

  formatDateTime(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  navigateToProfile(username: string) {
    this.router.navigate(['/app-profile', username])
  }

}
