import {FoListComponent} from './fo-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FoDetailComponent} from './fo-detail.component';


const routes: Routes = [
  {path: '', component: FoListComponent},
  {path: ':systemName', component: FoDetailComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoRoutingModule {
}
