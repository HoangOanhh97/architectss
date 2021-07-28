import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-award-detail',
  templateUrl: './award-detail.component.html',
  styleUrls: ['./award-detail.component.scss']
})
export class AwardDetailComponent implements OnInit {
  awardDetail: any;
  isShow = false;

  constructor(private dialogRef: MatDialogRef<AwardDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private elementRef: ElementRef) { 
    this.awardDetail = data.detail[0];
    console.log(this.awardDetail);

    this.isShow = this.awardDetail.content3 != "" ? true : false;
  }

  ngOnInit() {
    
  }

  closeDialod() {
    this.dialogRef.close();
  }
}
