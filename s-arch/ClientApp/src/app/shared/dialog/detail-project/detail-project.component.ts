import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';


@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss']
})
export class DetailProjectComponent implements OnInit {
  projectDetail: any = {};
  selectedView : any = {}
  proId: any;
  minitabSelected = 1;
  openGallery = false;

  constructor(private dialogRef: MatDialogRef<DetailProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient, private router: Router) {
    this.proId = data.pId;
  }

  ngOnInit() {
    this.getDetailProject(this.proId);
  }

  getDetailProject(id: any) {
    this.http.get('assets/data/projects.json').subscribe(r => {
      var detailProject = r as  any[];
      this.projectDetail = detailProject.filter(x => x.idNumber == id)[0];
      this.selectedView = this.projectDetail.listView[0];
    })
  }

  removeActiveClass(id: any) {
    $(id).removeClass("active");
  }

  seeMoreProjects() {
    this.dialogRef.close();
    this.router.navigate(['/projects']);
  }
}
