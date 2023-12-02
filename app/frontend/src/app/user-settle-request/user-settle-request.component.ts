import { Component, Inject, Input } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
  selector: 'app-user-settle-request',
  templateUrl: './user-settle-request.component.html',
})
export class UserSettleRequestComponent {
  outcome: string = ''
  outcomeSource: string = ''

  constructor(
    public dialogRef: MatDialogRef<UserSettleRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  sendRequest(): void {
    this.dialogRef.close({
      outcome: this.outcome,
      outcomeSource: this.outcomeSource,
    })
  }
}
