import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ApplicationsListComponent} from './applications.list.component';

const routes: Routes = [
  {path: '', component: ApplicationsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {

}
