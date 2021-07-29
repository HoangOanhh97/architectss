import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  members: any;

  constructor(private http: HttpClient, private apiService: ApiService) {
    // http.get('assets/data/members.json').subscribe(r => {
    //   this.members = r;
    //   console.log(this.members);
    // })
  }

  ngOnInit() {
    this.apiService.getAllMembers().then(res => {
      this.members = res.data['getAllMembers'];
      console.log(this.members);
    })
  }

}
