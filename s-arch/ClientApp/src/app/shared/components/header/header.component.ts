import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../services/common.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any = JSON.parse(sessionStorage.getItem('currentUser')) || null;
  isGuest: boolean = !!sessionStorage.getItem('isGuest');
  openHeaderSearch = false;
  opensearchNav = false;
  navActive: any;
  hide = true;
  language = "Tiếng Việt";
  anotherLang = "English";
  lang: any;
  showLangChange = false;
  logoMenu = false;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger;
  imgLogo: any;

  constructor(private router: Router, private route: ActivatedRoute,
    private translate: TranslateService, cf: NgbDropdownConfig, private apiService: ApiService) {
    this.route.data.subscribe(r => {
      this.navActive = r.title;
      this.setImgLogo(this.navActive);
    })

    const currentLang = localStorage.getItem('currentLang');
    this.language = currentLang === 'vi' ? "Tiếng Việt" : 'English';
    this.anotherLang = currentLang === 'vi' ? "English" : 'Tiếng Việt';

    this.lang = currentLang;
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);

    cf.placement = 'bottom-left';
    cf.autoClose = true;
  }

  ngOnInit() {
    if (!this.isGuest && (!this.currentUser || (this.currentUser && !this.currentUser.name))) {
      this.apiService.me().then(res => {
        this.currentUser = res.data.me;
      })
    }
  }

  setImgLogo(nav) {
    if (nav == "projects" || nav == "news" || nav == "contact") {
      return 'url("../../../assets/img/SA_Logo/S_logo_png.png")';
    }
    else {
      return 'url("../../../assets/img/SA_Logo/S_logo_white_png.png")';
    }
  }

  onTextSelection(trigger, event: any): void {
    var menu = document.getElementById('menuBtn') as any;
    menu.style.display = '';
    menu.style.position = 'fixed';
    menu.style.left = 48 + 'px';
    menu.style.top = 60 + 'px';
    menu.style.opacity = '0';

    trigger.openMenu();
  }

  menuenter() {
    this.isMatMenuOpen = true;
    if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    }
  }

  menuLeave(trigger, button) {
    setTimeout(() => {
      if (!this.isMatMenu2Open && !this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80)
  }

  menu2enter() {
    this.isMatMenu2Open = true;
  }

  menu2Leave(trigger1, trigger2, button) {
    setTimeout(() => {
      if (this.isMatMenu2Open) {
        trigger1.closeMenu();
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        this.enteredButton = false;
      } else {
        this.isMatMenu2Open = false;
        trigger2.closeMenu();
      }
    }, 100)
  }

  buttonLeave(trigger, button) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
      } if (!this.isMatMenuOpen) {
        trigger.closeMenu();
      } else {
        this.enteredButton = false;
      }
    }, 100)

  }

  public getBgHeader(e) {
    if (!['projects', 'news', 'contact'].includes(this.navActive))
      return '#000';
    return '#fff'
  }

  openSearchNav() {
    this.opensearchNav = !this.opensearchNav;
    $('#nav-search').addClass('nav-wrapper').removeClass('hs-hidden closed-nav');
    $('.fp-instant-search').addClass('fadeIn third').removeClass('closed-nav');
    $('.fp-header-search-gradient').addClass('header-top-gradient-is-open open fadeIn second').removeClass('fadeOut');
    // $('.fp-header').addClass('header-top-gradient-is-open fp-navigation-is-open');
  }
  clearNav() {
    this.opensearchNav = false;
    $('.fp-instant-search').removeClass('fadeIn third').addClass('closed-nav');
    $('#nav-search').removeClass('nav-wrapper').addClass('hs-hidden closed-nav');
    $('.fp-header-search-gradient').removeClass('header-top-gradient-is-open open fadeIn second').addClass('fadeOut');
  }

  openSearch() {
    this.openHeaderSearch = !this.openHeaderSearch;
    $('#hs-search').addClass('hs-wrapper').removeClass('hs-hidden closed-nav');
    $('.fp-instant-search').addClass('fadeIn third').removeClass('closed-nav ');
    $('.fp-header-search-gradient').addClass('header-top-gradient-is-open open fadeIn second').removeClass('fadeOut');
    $('.fp-header').addClass('header-top-gradient-is-open fp-navigation-is-open');
  }

  clear() {
    this.openHeaderSearch = false;
    $('.fp-instant-search').removeClass('fadeIn third').addClass('closed-nav');
    $('#hs-search').removeClass('hs-wrapper').addClass('hs-hidden closed-nav');
    $('.fp-header-search-gradient').removeClass('header-top-gradient-is-open open fadeIn second').addClass('fadeOut');
    $('.fp-header').removeClass('header-top-gradient-is-open fp-navigation-is-open');
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
    this.showLangChange = !this.showLangChange;
  }

  changeLang() {
    this.showLangChange = !this.showLangChange;
  }

  setFill(id) {
    if (this.hide == false) {
      $(id).css({ "fill": "rgb(255, 255, 255)" });
    } else {
      $(id).css({ "fill": "" });
    }
  }

  goHomePage() {
    this.router.navigateByUrl('').then(() => {
      setTimeout(() => {
        location.reload();
      }, 10);
    });
  }

}
