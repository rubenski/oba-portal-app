import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ApplicationsListComponent} from './applications.list.component';
import {CreateApplicationComponent} from './create.application.component';

const routes: Routes = [
  {path: '', component: ApplicationsListComponent},
  {path: 'new', component: CreateApplicationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {

}
