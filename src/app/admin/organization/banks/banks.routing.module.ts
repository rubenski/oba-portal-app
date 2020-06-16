import {BanksListComponent} from './banks-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BankDetailComponent} from './bank-detail.component';


const routes: Routes = [
  {path: '', component: BanksListComponent},
  {path: ':systemName', component: BankDetailComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule {
}
