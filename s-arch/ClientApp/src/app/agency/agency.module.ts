import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AgencyRoutingModule } from './agency-routing.module';
import { CreateArticleComponent } from './news/create-article/create-article.component';

@NgModule({
  declarations: [
    CreateArticleComponent
  ],
  imports: [
    AgencyRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [],
  entryComponents: [
    CreateArticleComponent
  ]
})
export class AgencyModule { }
