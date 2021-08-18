import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import * as _ from "lodash";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateArticleComponent } from './create-article/create-article.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  tabSelected = 1;
  news: any = [];
  categories: any = [
    { title: 'News' },
    { title: 'Events' }
  ];
  articles: any = {};

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.apiService.getNews().then(res => {
      this.articles = _.groupBy(res.data.getNews, 'category');
      this.getArticlesByCategoryName("News");
    }).catch((reason) => {
      console.log('err: ', reason);
      this.http.get("assets/data/news.json").subscribe(r => {
        this.news = r;
        console.log(this.news);
      })
    })
  }

  getArticlesByCategoryName(title) {
    this.news = null;
    if (this.articles[title]) {
      this.news = this.articles[title];
      console.log(this.news);
    }
    this.removeActiveClass(title);
  }

  removeActiveClass(title) {
    console.log(title);
    this.categories.forEach(c => {
      if (c.title != title) {
        $("#" + c.title).removeClass("active");
      } else {
        $("#" + c.title).addClass("active");
      }
    });
  }

  openNewsDetail(n) {
    // this.router.navigateByUrl('/news/' + n.id);
  }

  public addArticle() {
    let dialogRef = this.dialog.open(CreateArticleComponent, {
      panelClass: 'col-md-6',
      disableClose: true,
    })

    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
    })
  }
}
