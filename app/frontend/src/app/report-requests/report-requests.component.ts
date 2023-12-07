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
        console.log('Fetched reports:', this.reports)
      },
      (error) => {
        console.error('Error fetching reports:', error)
      },
    )

   
  }
}
