import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminHomeRoutingModule} from './admin-home-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdminHomeComponent} from './admin-home.component';

@NgModule({
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    FlexLayoutModule
  ],
  exports: [],
  declarations: [AdminHomeComponent]
})
export class AdminHomeModule {
}
