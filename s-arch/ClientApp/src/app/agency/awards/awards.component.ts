import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AwardDetailComponent } from './award-detail/award-detail.component';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss'],
})
export class AwardsComponent implements OnInit {
  awards: any;
  awardDetail: any;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    http.get('assets/data/awards.json').subscribe(r => {
      this.awards = r;
      console.log(this.awards);
    })
  }

  ngOnInit() {
  }

  openDetailAward(name) {
    this.awardDetail = this.awards.filter(x => x.name == name);
    let dialogRef = this.dialog.open(AwardDetailComponent, {
      panelClass: 'col-md-6',
      data: {
        detail: this.awardDetail,
      }
    })
  }

}
