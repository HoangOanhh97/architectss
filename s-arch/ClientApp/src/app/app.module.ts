import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Apollo
import { GraphQLModule } from './graphql.module';

import { AppComponent } from './app.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewsService } from './shared/services/news.service';
import { SharedService } from './shared/services/shared.service';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localeVI from '@angular/common/locales/vi';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AwardDetailComponent } from './agency/awards/award-detail/award-detail.component';
import { GalleryComponent } from './agency/projects/gallery/gallery.component';
import { DetailProjectComponent } from './shared/dialog/detail-project/detail-project.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DashboardComponent } from './agency/dashboard/dashboard.component';
import { CompanyComponent } from './agency/company/company.component';
import { AwardsComponent } from './agency/awards/awards.component';
import { ContactComponent } from './agency/contact/contact.component';
import { NewsDetailDialogComponent } from './agency/news/news-detail-dialog/news-detail-dialog.component';
import { NewsComponent } from './agency/news/news.component';
import { ProjectComponent } from './agency/projects/project/project.component';
import { ProjectsComponent } from './agency/projects/projects.component';
import { TypesOfProjectComponent } from './agency/projects/types-of-project/types-of-project.component';
import { AppRoutingModule } from './app-routing.module';
import { LogoSvgComponent } from './shared/components/header/logo-svg/logo-svg.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoSvgComponent,
    FooterComponent,
    DashboardComponent,
    CompanyComponent,
    AwardsComponent,
    AwardDetailComponent,
    NewsComponent,
    NewsDetailDialogComponent,
    ContactComponent,
    ProjectComponent,
    TypesOfProjectComponent,
    ProjectsComponent,
    DetailProjectComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers: [
    SharedService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LOCALE_ID,
      useValue: 'vi-VN' // 'en-EN' for English-US...
    },
    NewsService
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  entryComponents: [
    DetailProjectComponent,
    GalleryComponent,
    AwardDetailComponent,
    NewsDetailDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localeVI);

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
