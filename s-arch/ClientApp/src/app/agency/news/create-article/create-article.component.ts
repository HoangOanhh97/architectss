import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import _ from 'lodash';

export interface IArticle {
  title: String,
  descriptionHTML: String,
  image: String,
  category: String
}
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  public isCreated: Boolean = true;
  public article: any = {};
  public isValid: Boolean = null;

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

  public onSave() {
    this.isValid = true;
    Object.keys(this.article).forEach(k => {
      if (['image'].includes(k)) {
        this.article[k] = " "
        return;
      }
      if (this.isNullOrEmpty(this.article[k])) {
        return this.isValid = false;
      }
    })
    if (this.isValid) {
      this.dialogRef.close(this.article);
    }
  }

  private isNullOrEmpty(value) {
    return value === null || value === undefined || (value && _.trim(value) === '')
  }

}
