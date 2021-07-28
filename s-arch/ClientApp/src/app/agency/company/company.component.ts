import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  members: any;

  constructor(private http: HttpClient) {
    http.get('assets/data/members.json').subscribe(r => {
      this.members = r;
      console.log(this.members);
    })
  }

  ngOnInit() {
  }

}
