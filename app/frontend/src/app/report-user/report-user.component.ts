import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.css']
})
export class ReportUserComponent {
  reason: string = ''

  constructor(
    public dialogRef: MatDialogRef<ReportUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  sendRequest(): void {
    this.dialogRef.close({
      outcomeSource: this.reason,
    })
  }
}
