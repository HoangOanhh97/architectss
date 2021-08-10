import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-projects-type',
  templateUrl: './projects-type.component.html',
  styleUrls: ['./projects-type.component.scss']
})
export class ProjectsTypeComponent implements OnInit {
  showDropdown = false;
  tabSelected = 1;
  projectDetail: any = [];
  projects: any = [];
  types: any = [];
  projectTypeName = "";
  total: any;
  filterProjects: any = [];
  currentTab = "All";

  constructor(private router: Router, cf: NgbDropdownConfig, private http: HttpClient, private route: ActivatedRoute,
    private apiService: ApiService) {
    cf.placement = 'bottom-left';

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd && event.url && event.url.split('?')[0].endsWith('/types')) {
        this.currentTab = (this.route.snapshot.queryParams['name']) || 'All';
        this.apiService.getProjectTypes().then(res => {
          this.types = _.orderBy(res.data.getProjectTypes, 'typeId', 'asc');
          const currentType = _.find(this.types, { typeName: this.currentTab }) || {};
          console.log(currentType)
          this.apiService.getProjects({ 'typeId': currentType.typeId || null }).then(res => {
            console.log('projects: ', res.data.getProjects)
            this.projects = res.data.getProjects;
            this.filterTypeProject(this.currentTab);
          })
        });
      }
    })
  }

  ngOnInit() {
  }

  getProjectsByType(type) {
    this.router.navigate(["agency/projects/types"], { queryParams: { name: type } });
    this.showDropdown = false;
  }

  filterTypeProject(type) {
    this.showDropdown = false;
    this.currentTab = type;
    switch (type) {
      case "All":
        this.projectTypeName = "All project types";
        this.filterProjects = this.projects;
        break;
      case "Recently Completed":
        this.projectTypeName = "Recently Completed";
        this.filterProjects = this.projects.filter(x => x.done == true);
        break;
      default:
        this.filterProjects = this.projects.filter(x => x.typeName == type);
        this.projectTypeName = type;
        break;

    }
    this.total = this.filterProjects.length;
  }

  getProjectDetail(id) {
    this.router.navigate(["agency/projects/" + id]);
  }

}
