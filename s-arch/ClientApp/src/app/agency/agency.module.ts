import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AgencyRoutingModule } from './agency-routing.module';

@NgModule({
    declarations: [],
    imports: [
        AgencyRoutingModule,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    exports: []
})
export class AgencyModule { }
