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

  constructor(translate: TranslateService) {
    translate.setDefaultLang('vi');
    translate.use('en');
    if (!localStorage.getItem('currentLang')) {
      localStorage.setItem('currentLang', 'en');
    }

  }
}
