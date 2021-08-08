import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { GalleryComponent } from '../gallery/gallery.component';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';

declare var Swiper: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit, AfterViewInit {
  projectId: number;
  projectDetail: any;
  selectedView = {};
  minitabSelected = 1;
  swiper: any;
  anotherProjects: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, 
    private elementRef: ElementRef, private dialog: MatDialog,
    private apiService: ApiService) {
    this.projectId = parseInt(this.route.snapshot.params["id"], 10);
    this.apiService.getProjectById(this.projectId).then(res => {
      this.projectDetail = res.data.getProjectById;
      this.getProjectDetail(this.projectId);
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const swiper = new Swiper(this.elementRef.nativeElement.querySelector('.swiper__project'), {
        //Here you can provide Swiper config
        slidesPerView: 1,
        spaceBetween: 30,
        loopFillGroupWithBlank: true,
        loop: true,
        autoplay: {
          delay: 5000,
          waitForTransition: true,
          disableOnInteraction: false,
        },
        speed: 1500,
        breakpoints: {
          // when window width is >= 1024px
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 40
          }
        }
      });
    }, 500)
  }

  getProjectDetail(id: number) {
    this.http.get('assets/data/projects.json').subscribe(r => {
      const data = r as any[];
      const item = data.filter(x => x.idNumber == id)[0];
      this.selectedView = item.listView[0] || {};
      this.projectDetail.participants = item.participants || [];
      this.anotherProjects = data.filter(x => (x.typeName == this.projectDetail.typeName) && x.idNumber != id);
      console.log(this.projectDetail);
      console.log(this.anotherProjects);
    })
  }

  removeActiveClass(id: String) {
    this.minitabSelected = id.includes('team') ? 1 : 2;
    $(id).removeClass("active");
  }

  seeMoreProjects(type) {
    this.router.navigate(["/projects/types"], { queryParams: { name: type } });
  }

  goProject(id) {
    if (this.projectDetail.idNumber != id) {
      this.router.navigateByUrl("/projects/" + id).then(() => {
        setTimeout(() => {
          location.reload();
        }, 20);
      });
      this.getProjectDetail(id);
    }
  }

  openGalleryDialog() {
    setTimeout(() => {
      let dialogRef = this.dialog.open(GalleryComponent, {
        panelClass: 'col-md-12',
        height: '100vh',
        data: {
          detail: this.projectDetail.listView || [],
        }
      });
    }, 200);
  }
}
