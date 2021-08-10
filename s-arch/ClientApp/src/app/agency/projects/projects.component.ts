import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: any = [];
  types: any = [];
  filterProjects: any = [];

  constructor(private router: Router, cf: NgbDropdownConfig, private http: HttpClient,
    private apiService: ApiService) {
    cf.placement = 'bottom-left';
  }

  ngOnInit() {
    this.apiService.getProjectTypes().then(res => {
      this.types = _.orderBy(res.data.getProjectTypes, 'typeId', 'asc');
    });
  }

  getProjectsByType(type) {
    this.router.navigate(["agency/projects/types"], { queryParams: { name: type } })
  }

}
