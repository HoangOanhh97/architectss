import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AwardsComponent } from "./awards/awards.component";
import { CompanyComponent } from "./company/company.component";
import { ContactComponent } from "./contact/contact.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NewsDetailDialogComponent } from "./news/news-detail-dialog/news-detail-dialog.component";
import { NewsComponent } from "./news/news.component";
import { ProjectComponent } from "./projects/project/project.component";
import { ProjectsTypeComponent } from "./projects/projects-type/projects-type.component";
import { ProjectsComponent } from "./projects/projects.component";

const routes: Routes = [
    { path: '', component: DashboardComponent, data: { title: 'homepage' } },
    { path: 'company', component: CompanyComponent, data: { title: 'company' } },
    { path: 'award', component: AwardsComponent, data: { title: 'award' } },

    { path: 'projects', component: ProjectsComponent, data: { title: 'projects' } },
    { path: 'projects/types', component: ProjectsTypeComponent, data: { title: 'projects' } },
    { path: 'projects/:id', component: ProjectComponent, data: { title: 'projectDetail' } },

    { path: 'news', component: NewsComponent, data: { title: 'news' } },
    { path: 'news/:id', component: NewsDetailDialogComponent, data: { title: 'news' } },
    { path: 'contact', component: ContactComponent, data: { title: 'contact' } },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AgencyRoutingModule { }