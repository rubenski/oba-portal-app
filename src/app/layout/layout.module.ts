import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {AdminHeaderComponent} from './admin-header/admin-header.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    AdminHeaderComponent
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    AdminHeaderComponent
  ]
})
export class LayoutModule { }
