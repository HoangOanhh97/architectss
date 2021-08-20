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
import { SnotifyService } from 'ng-snotify';

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
    private dialog: MatDialog, private snackBar: MatSnackBar, private snotify: SnotifyService) {
  }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.apiService.getNews().then(res => {
      this.articles = _.groupBy(res.data.getNews, 'category');
      const title = this.tabSelected === 1 ? 'News' : 'Events';
      this.getArticlesByCategoryName(title);
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
      this.news = (this.articles[title] || []);
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

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.apiService.postArticle(data).then(res => {
          if (res.data && res.data.postArticle) {
            this.snackBar.open('Post article successfully!', null, { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top' });
            this.getArticles();
            return;
          }
          return this.snotify.error('Error!');
        })
      }
    })
  }

  public update(item) {
    this.dialog.open(CreateArticleComponent, {
      panelClass: 'col-md-4',
      disableClose: true,
      data: {
        article: item
      }
    }).afterClosed().subscribe(data => {
      if (data) {
        const { category, title, descriptionHTML, image } = data;
        this.apiService.updateArticle(item.title, { category, title, descriptionHTML, image }).then(res => {
          if (res.data && res.data.updateArticle) {
            this.snackBar.open('Update Successfully!', null, { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top' });
            this.getArticles();
            return;
          }
          return this.snotify.error('Error!');
        }).catch(err => {
          this.snotify.error(err[0]?.message)
        })
      }
    })
  }

  public delete(item) {
    this.snackBar._openedSnackBarRef ? this.snackBar._openedSnackBarRef.dismiss() : '';
    this.snackBar.openFromComponent(ConfirmModalComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: 'Are you sure you want to delete this article?'
    }).afterDismissed().subscribe(data => {
      if (data.dismissedByAction) {
        this.apiService.deleteArticle(item.title).then(res => {
          if (res.data && res.data.deleteArticle) {
            this.snackBar.open(res.data.deleteArticle.message, null, { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top' });
          }
          this.getArticles();
        })
      }
    })
  }

}
