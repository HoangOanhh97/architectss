import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'app-news-detail-dialog',
  templateUrl: './news-detail-dialog.component.html',
  styleUrls: ['./news-detail-dialog.component.scss']
})
export class NewsDetailDialogComponent implements OnInit {
  nameOfNews: string = '';
  selectedNews: any;
  newsId: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private newsService: NewsService) {
    this.route.params.subscribe((params: Params) => this.newsId = params['id']);
    // console.log(this.nameOfNews);
  }

  ngOnInit() {
    this.getDetailByName(this.newsId);
  }

  getDetailByName(id) {
    // this.http.get("assets/data/news.json").subscribe(r => {
    //   var list = r..json();
    //   this.selectedNews = list.find(x => x.title == name);
    //   console.log(this.selectedNews);
    //   if (this.selectedNews) {
    //     document.getElementById("selectedNewsDetail").children[0].children[0].innerHTML = this.selectedNews.descriptionHTML;
    //   }
    // })
    // this.newsService.getArticle(id).subscribe(r=>{
    //   var selectedNewsDetail=  document.getElementById("selectedNewsDetail")  as any;
    //   selectedNewsDetail.children[0].children[0].innerHTML = r.content;
    // })
  }

}
