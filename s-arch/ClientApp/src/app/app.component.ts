import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 's-arch';
  page = "";
  public static isGuest = false;

  constructor(translate: TranslateService) {
    translate.setDefaultLang('vi');
    translate.use('vi');
    if (!localStorage.getItem('currentLang')) {
      localStorage.setItem('currentLang', 'vi');
    }

    if (sessionStorage.getItem('isGuest')) {
      AppComponent.isGuest = !!sessionStorage.getItem('isGuest');
    }

  }
}
