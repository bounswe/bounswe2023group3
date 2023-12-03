import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'

@Component({
  selector: 'app-confirm-model',
  templateUrl: './confirm-model.component.html',
})
export class ConfirmModelComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancel(): void {
    this.dialogRef.close(false)
  }

  confirm(): void {
    this.dialogRef.close(true)
  }
}
