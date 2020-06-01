import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RedirectUrlsComponent} from './redirect-urls.component';

const routes: Routes = [
  {path: '', component: RedirectUrlsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedirectUrlsRoutingModule {
}
