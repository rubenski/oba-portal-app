import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RedirectUrlsListComponent} from './redirect-urls-list.component';

const routes: Routes = [
  {path: '', component: RedirectUrlsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedirectUrlsRoutingModule {
}
