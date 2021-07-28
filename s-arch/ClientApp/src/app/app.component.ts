import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 's-arch';
  page = "";

  constructor(translate: TranslateService) {
    translate.setDefaultLang('vi');
    translate.use('vi');
    if (!localStorage.getItem('currentLang')) {
      localStorage.setItem('currentLang', 'vi');
    }

  }
}
