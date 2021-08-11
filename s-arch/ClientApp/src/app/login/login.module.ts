import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: LoginComponent}
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
