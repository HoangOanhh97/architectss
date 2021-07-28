import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import * as _ from "lodash";
import { Router } from '@angular/router';

import { NewsService } from '../../shared/services/news.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  tabSelected = 1;
  news: any = [];
  categories : any= [];
  articles: any = [];

  constructor(private http: HttpClient, private router: Router, private newsService: NewsService) {
    // this.http.get("assets/data/news.json").subscribe(r => {
    //   this.news = r.json();
    //   console.log(this.news);
    // })
  }

  ngOnInit() {
    this.getArticles();
    this.getCategories();

  }

  getArticles() {
    this.newsService.getArticles().subscribe(r => {
      r.forEach(e => {
        // if (e.description != "" || e.description != null) {
          this.articles.push(e);
        // }
      });
      this.articles = _.groupBy(this.articles, 'category.title');
      this.getArticlesByCategoryName("News");
    });
  }

  getCategories() {
    this.newsService.getCategories().subscribe(r => {
      console.log(r);
      this.categories = _.sortBy(r, 'title');

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
      }
    });

    // if (id === '#news-tab-button') {
    //   $(id).addClass("underlineHover");
    // } else {
    //   $("#news-tab-button").removeClass("underlineHover");
    // }
  }

  openNewsDetail(n) {
    this.router.navigateByUrl('/news/' + n.id);
  }
}
