import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  language = "Tiếng Việt";
  anotherLang = "English";
  types: any = [];
  lang: any;

  constructor(cf: NgbDropdownConfig, private router: Router,
    private http: HttpClient, private translate: TranslateService) {
    const currentLang = localStorage.getItem('currentLang');
    this.language = currentLang === 'vi' ? "Tiếng Việt" : 'English';
    this.anotherLang = currentLang === 'vi' ? "English" : 'Tiếng Việt';

    cf.placement = 'top-left';
    cf.autoClose = true;

    this.http.get('assets/data/TypesOfProject.json').subscribe(r => {
      this.types = r;
    })

    this.lang = currentLang;
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang)

  }

  ngOnInit() {
  }

  getProjectsByType(type) {
    this.router.navigate(["/projects/types"], { queryParams: { name: type } })
  }

  projectsPage() {
    this.router.navigateByUrl("/projects")
  }

  newsPage() {
    this.router.navigateByUrl("/news");
  }

  contactPage() {
    this.router.navigateByUrl("/contact");
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
}
