import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {RedirectUrlsListComponent} from './redirect-urls-list.component';
import {RedirectUrlsRoutingModule} from './redirect-urls.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RedirectUrlsRoutingModule
  ],
  declarations: [RedirectUrlsListComponent],
  exports: [RedirectUrlsListComponent]
})
export class RedirectUrlsModule {
}
