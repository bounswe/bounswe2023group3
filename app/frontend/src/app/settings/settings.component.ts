import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { environment } from 'src/environments/environment'


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  apiUrl = environment.apiBaseUrl;

  user_id!: any
  constructor(private router: Router, private http: HttpClient, private dialog: MatDialog) {
    this.user_id = localStorage.getItem('user_id')
  }

  changePassword(){
    this.router.navigate(['/app-change-password'])
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        title: 'Delete Account',
        message: 'Are you sure you want to delete your account?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked 'Yes' in the confirmation dialog
        this.http.delete(this.apiUrl + '/user/' + this.user_id).subscribe(
          (response: any) => {
            // Handle success if needed
            console.log('Account deleted successfully:', response);
          },
          (error) => {
            console.error('Error deleting account:', error);
          }
        );
        this.router.navigate(['/app-welcome']);
      }
    });
  }
}