import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import _ from 'lodash';

export interface IArticle {
  title: String,
  descriptionHTML: String,
  image: String,
  category: String,
  link: String
}
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  public isCreated: boolean = false;
  public isUpdated: boolean = false;
  public isViewed: boolean = false;
  public article: IArticle = {
    title: '',
    descriptionHTML: '',
    image: '',
    category: '',
    link: ''
  };
  public isValid: Boolean = null;

  constructor(public dialogRef: MatDialogRef<CreateArticleComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.isCreated = data.title == 'create';
    this.isUpdated = data.title == 'update';
    this.isViewed = data.title == 'view';
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
      if (['image', 'link', "created_at", "updated_at"].includes(k)) {
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
