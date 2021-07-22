import { Test } from '@app/_models';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'test-accept-dialog',
  templateUrl: 'test-accept-dialog.html',
  styles: [
    `
      .dialog-actions {
        justify-content: space-between;
      }
    `,
  ],
})
export class TestAcceptDialog {
  checked = false;
  disabled = false;

  constructor(
    public dialogRef: MatDialogRef<TestAcceptDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Test
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
