import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Apollo
import { GraphQLModule } from './graphql.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedService } from './shared/services/shared.service';
import { SharedModule } from './shared/shared.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localeVI from '@angular/common/locales/vi';

import { DashboardComponent } from './agency/dashboard/dashboard.component';
import { CompanyComponent } from './agency/company/company.component';
import { AwardsComponent } from './agency/awards/awards.component';
import { AwardDetailComponent } from './agency/awards/award-detail/award-detail.component';
import { ContactComponent } from './agency/contact/contact.component';
import { NewsComponent } from './agency/news/news.component';
import { NewsDetailDialogComponent } from './agency/news/news-detail-dialog/news-detail-dialog.component';
import { ProjectsComponent } from './agency/projects/projects.component';
import { ProjectsTypeComponent } from './agency/projects/projects-type/projects-type.component';
import { ProjectComponent } from './agency/projects/project/project.component';
import { GalleryComponent } from './agency/projects/gallery/gallery.component';
import { DetailProjectComponent } from './shared/dialog/detail-project/detail-project.component';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { AuthService } from './shared/auth/auth.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CompanyComponent,
    AwardsComponent,
    AwardDetailComponent,
    NewsComponent,
    NewsDetailDialogComponent,
    ContactComponent,
    ProjectComponent,
    ProjectsTypeComponent,
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
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SnotifyModule,
    SharedModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    SharedService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LOCALE_ID,
      useValue: 'vi-VN' // 'en-EN' for English-US...
    },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
  ],
  exports: [],
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
