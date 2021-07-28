import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { GalleryComponent } from '../gallery/gallery.component';
import { HttpClient } from '@angular/common/http';

declare var Swiper: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {
  projectId: number;
  projectDetail: any;
  selectedView = {};
  minitabSelected = 1;
  swiper: any;
  anotherProjects: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private elementRef: ElementRef, private dialog: MatDialog) {
    this.projectId = parseInt(this.route.snapshot.paramMap["id"]);
    // console.log(this.projectId);
  }

  ngOnInit() {
    this.getProjectDetail(this.projectId);
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.swiper = new Swiper(this.elementRef.nativeElement.querySelector('.swiper__project'), {
        //Here you can provide Swiper config
        slidesPerView: 2,
        slidesPerGroup: 2,
        loopFillGroupWithBlank: true,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          waitForTransition: true,
          disableOnInteraction: false,
        },
        speed: 1500,
      });
    }, 500)

    setTimeout(() => {
      this.swiper = new Swiper(this.elementRef.nativeElement.querySelector('.swiper-responsive__project'), {
        //Here you can provide Swiper config
        spaceBetween: 50,
        loop: true,
        speed: 1500,
        autoplay: {
          delay: 5000,
          // waitForTransition: true,
          // disableOnInteraction: false,
        },
      });
    }, 500)
  }

  getProjectDetail(id: number) {
    this.http.get('assets/data/projects.json').subscribe(r => {
      var data = r as any[];
      // console.log(data);
      this.projectDetail = data.filter(x => x.idNumber == id)[0];
      this.selectedView = this.projectDetail.listView[0];
      this.anotherProjects = data.filter(x => (x.typeName == this.projectDetail.typeName) && x.idNumber != id);
      console.log(this.anotherProjects);
    })
  }

  removeActiveClass(id) {
    $(id).removeClass("active");
  }

  seeMoreProjects(type) {
    this.router.navigate(["/projects/type"], { queryParams: { projecttype: type } });
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
