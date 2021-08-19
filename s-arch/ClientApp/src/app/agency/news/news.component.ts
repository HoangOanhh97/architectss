import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import * as _ from "lodash";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateArticleComponent } from './create-article/create-article.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmModalComponent } from 'src/app/shared/dialog/confirm-modal/confirm-modal.component';

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
    private dialog: MatDialog, private snackBar: MatSnackBar) {
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
    this.tabSelected = title === 'News' ? 1 : 2;
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
      panelClass: 'col-md-4',
      data: {
        isCreated: true,
      },
      disableClose: true,
    })

    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
    })
  }

  public update(item) {
    this.dialog.open(CreateArticleComponent, {
      panelClass: 'col-md-4',
      disableClose: true,
      data: {
        article: item
      }
    }).afterClosed().subscribe(res => {
      console.log(res)
    })
  }

  public delete(item) {
    this.snackBar._openedSnackBarRef ? this.snackBar._openedSnackBarRef.dismiss() : '';
    this.snackBar.openFromComponent(ConfirmModalComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: 'Are you sure you want to delete this article?'
    }).afterDismissed().subscribe(res => {
      console.log(res)
      if (res.dismissedByAction) {

      }
    })
  }

}
