import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import _ from 'lodash';

export interface IArticle {
  title: String,
  descriptionHTML: String,
  image: String,
  category: String,
  link: String,
  created_at: Date,
  updated_at: Date
}
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  public isCreated: Boolean = true;
  public article: IArticle = {
    title: '',
    descriptionHTML: '',
    image: '',
    category: '',
    link: '',
    created_at: null,
    updated_at: null
  };
  public isValid: Boolean = null;

  constructor(public dialogRef: MatDialogRef<CreateArticleComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.isCreated = !!data.isCreated;
    this.article = data.article || {};

    this.article[this.isCreated ? 'created_at' : 'updated_at'] = new Date();
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
    this.article.updated_at = new Date();
    console.log(this.article)
    Object.keys(this.article).forEach(k => {
      if (k === 'created_at' && this.isNullOrEmpty(this.article[k])) {
        return this.article[k] = new Date();
      }
      if (['image', 'link', "updated_at"].includes(k)) {
        this.article[k] = " "
        return;
      }
      if (this.isNullOrEmpty(this.article[k])) {
        console.log(k)
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
