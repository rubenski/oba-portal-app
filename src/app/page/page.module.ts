import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageComponent} from './page.component';
import {PageRoutingModule} from './page-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    FlexLayoutModule
  ]
})
export class PageModule { }
