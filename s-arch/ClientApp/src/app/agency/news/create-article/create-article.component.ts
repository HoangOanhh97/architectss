import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  public isCreated: Boolean = true;
  article: any = {};

  constructor(public dialogRef: MatDialogRef<CreateArticleComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.isCreated = !!data.isCreated;
    this.article = data.article || {};
  }

  ngOnInit(): void {
  }

  public uploadFiles(e) {
    const files = e.target.files[0];
    if (files) {
      console.log(files)
    }
  }

  public create() {

  }

  public save() {

  }

}
