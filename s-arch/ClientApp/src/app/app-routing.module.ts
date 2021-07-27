import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'agency', loadChildren: () => import('./agency/agency.module').then(a => a.AgencyModule) },
    { path: '', redirectTo: '/agency', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }