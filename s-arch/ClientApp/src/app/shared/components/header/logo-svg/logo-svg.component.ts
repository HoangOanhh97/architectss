import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logo-svg',
  templateUrl: './logo-svg.component.html',
  styleUrls: ['./logo-svg.component.scss']
})
export class LogoSvgComponent implements OnInit {
  navActive: any;
  uselogo = true;

  constructor(private route: ActivatedRoute, ) {
    this.route.data.subscribe(r => {
      this.navActive = r.title;
    })

    if (this.navActive == "projects" || this.navActive == "news" || this.navActive == "contact") {
      this.uselogo = false;
    }
    else
      this.uselogo = true;
  }

  ngOnInit() {
  }

}
