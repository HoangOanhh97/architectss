import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import _ from 'lodash';

export interface IArticle {
  title: String,
  descriptionHTML: String,
  image: String,
  category: String,
  link: ''
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
    link: ''
  };
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

  public onChangeValue(value) {
    
  }

  public onSave() {
    this.isValid = true;
    console.log(this.article)
    Object.keys(this.article).forEach(k => {
      if (['image', 'link', "created_at"].includes(k)) {
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
