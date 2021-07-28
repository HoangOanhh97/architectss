import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
declare var Swiper: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  projects: any;
  language = "Tiếng Việt";
  anotherLang = "English";
  lang: any;
  swiper: any;

  constructor(
    cf: NgbDropdownConfig,
    private elementRef: ElementRef,
    private http: HttpClient,
    private translate: TranslateService,
    private router: Router, private route: ActivatedRoute) {

    cf.placement = 'top-left';
    cf.autoClose = true;

    const currentLang = localStorage.getItem('currentLang');
    this.language = currentLang === 'vi' ? "Tiếng Việt" : 'English';
    this.anotherLang = currentLang === 'vi' ? "English" : 'Tiếng Việt';

    this.http.get('assets/data/projects.json').subscribe(r => {
      this.projects = r;
    })

    this.lang = currentLang;
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang)
  }

  ngAfterViewInit() {
    this.swiper = new Swiper(this.elementRef.nativeElement.querySelector('.swiper-container'), {
      //Here you can provide Swiper config
      speed: 1500,
      loop: true,
      spaceBetween: 0,
      centeredSlides: true,
      autoplay: {
        delay: 6000,
        waitForTransition: true,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination__home',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' +
            '<svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16">' +
            '<circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF" stroke-opacity="1" stroke-width="1.5px"></circle>' +
            '<circle cx="8" cy="8" r="2.5" fill="#FFF"></circle>' +
            '</svg></span>';
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  useLanguage(lang: string) {
    if (lang === "Tiếng Việt") {
      this.language = "Tiếng Việt";
      this.anotherLang = "English";
      this.translate.use('vi');
      localStorage.setItem('currentLang', 'vi');
    }
    else {
      this.language = "English";
      this.anotherLang = "Tiếng Việt";
      this.translate.use('en');
      localStorage.setItem('currentLang', 'en');
    }
  }

  openProject(id) {
    this.router.navigate([`/projects/${id}`], { relativeTo: this.route })
  }
}
