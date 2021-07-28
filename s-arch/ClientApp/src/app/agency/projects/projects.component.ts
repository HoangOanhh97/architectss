import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: any = [];
  types: any = [];
  filterProjects: any = [];

  constructor(private router: Router, cf: NgbDropdownConfig, private http: HttpClient) {
    cf.placement = 'bottom-left';

    this.http.get('assets/data/projects.json').subscribe(r => {
      this.projects = _.sortBy(r, 'name');
    });
    this.http.get('assets/data/TypesOfProject.json').subscribe(r => {
      this.types = _.sortBy(r, 'typeId');
    })
  }

  ngOnInit() {

  }

  getProjectsByType(type) {
    this.router.navigate(["/projects/type"], { queryParams: { projecttype: type } })
  }

}
