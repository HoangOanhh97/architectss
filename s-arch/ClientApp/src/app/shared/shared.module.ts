import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { LogoSvgComponent } from './components/header/logo-svg/logo-svg.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material.module';
import { ConfirmModalComponent } from './dialog/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoSvgComponent,
    FooterComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    RouterModule,
    TranslateModule,
    MaterialModule,

    HeaderComponent,
    FooterComponent,
  ], 
  entryComponents: [
    ConfirmModalComponent
  ]
})
export class SharedModule { }
