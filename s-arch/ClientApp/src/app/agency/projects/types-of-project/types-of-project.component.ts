import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-types-of-project',
  templateUrl: './types-of-project.component.html',
  styleUrls: ['./types-of-project.component.scss']
})
export class TypesOfProjectComponent implements OnInit {
  showDropdown = false;
  tabSelected = 1;
  projectDetail: any = [];
  projects: any = [];
  types: any = [];
  projectTypeName = "";
  total: any;
  filterProjects: any = [];
  currentTab = "All";

  constructor(private router: Router, cf: NgbDropdownConfig, private http: HttpClient, private route: ActivatedRoute) {
    cf.placement = 'bottom-left';

    this.http.get('assets/data/projects.json').subscribe(r => {
      this.projects = _.sortBy(r, 'name');
      console.log(this.projects);
      this.getProjects();
    });
    this.http.get('assets/data/TypesOfProject.json').subscribe(r => {
      this.types = _.sortBy(r, 'typeId');
    })


  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.route.queryParams.subscribe(r => {
      console.log(r.projecttype);
      var pt = r.projecttype;
      if (pt == undefined) {
        this.filterTypeProject(this.currentTab);
      } else {
        this.filterTypeProject(r.projecttype);
      }
    })
  }

  getProjectsByType(type) {
    this.router.navigate(["/projects/type"], { queryParams: { projecttype: type } })
  }

  filterTypeProject(type) {
    this.showDropdown = false;
    this.currentTab = type;
    switch (type) {
      case "All":
        this.projectTypeName = "All project types";
        this.filterProjects = this.projects;
        // console.log(this.filterProjects);
        break;
      case "Recently Completed":
        this.projectTypeName = "Recently Completed";
        this.filterProjects = this.projects.filter(x => x.done == true);
        break;
      case "Architecture":
        this.filterProjects = this.projects.filter(x => x.typeName == type);
        this.projectTypeName = type;
        break;
      case "Interior":
        this.filterProjects = this.projects.filter(x => x.typeName == type);
        this.projectTypeName = type;
        break;
      case "Planning":
        this.filterProjects = this.projects.filter(x => x.typeName == type);
        this.projectTypeName = type;
        break;
      case "Landscape":
        this.filterProjects = this.projects.filter(x => x.typeName == type);
        this.projectTypeName = type;
        break;
    }
    this.total = this.filterProjects.length;
  }

  
  getProjectDetail(id) {
    this.router.navigate(["/projects/" + id]);
  }

}
