import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {RedirectUrlsComponent} from './redirect-urls.component';
import {RedirectUrlsRoutingModule} from './redirect-urls.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RedirectUrlsRoutingModule
  ],
  declarations: [RedirectUrlsComponent],
  exports: [RedirectUrlsComponent]
})
export class RedirectUrlsModule {
}
