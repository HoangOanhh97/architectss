import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AwardsComponent } from './agency/awards/awards.component';
import { CompanyComponent } from './agency/company/company.component';
import { ContactComponent } from './agency/contact/contact.component';
import { DashboardComponent } from './agency/dashboard/dashboard.component';
import { NewsDetailDialogComponent } from './agency/news/news-detail-dialog/news-detail-dialog.component';
import { NewsComponent } from './agency/news/news.component';
import { ProjectComponent } from './agency/projects/project/project.component';
import { ProjectsComponent } from './agency/projects/projects.component';
import { TypesOfProjectComponent } from './agency/projects/types-of-project/types-of-project.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, children:
      [
        //Pages
        { path: '', component: DashboardComponent, data: { title: 'homepage' } },
        { path: 'company', component: CompanyComponent, data: { title: 'company' } },
        { path: 'award', component: AwardsComponent, data: { title: 'award' } },

        { path: 'projects', component: ProjectsComponent, data: { title: 'projects' } },
        { path: 'projects/type', component: TypesOfProjectComponent, data: { title: 'projects' } },
        { path: 'projects/:id', component: ProjectComponent, data: { title: 'projectDetail' } },

        { path: 'news', component: NewsComponent, data: { title: 'news' } },
        { path: 'news/:id', component: NewsDetailDialogComponent, data: {title: 'news'}},
        { path: 'contact', component: ContactComponent, data: { title: 'contact' } },

      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }