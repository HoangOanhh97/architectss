import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string, public snackBarRef: MatSnackBarRef<ConfirmModalComponent>) {
    if (!data) {
      data = 'Are you sure you want to skip this warning?';
    }
  }

  ngOnInit(): void {
  }

  onClose(response?) {
    return response ? this.snackBarRef.dismissWithAction() : this.snackBarRef.dismiss();
  }

}
