import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CertificateAddComponent} from './certificate-add.component';
import {CertificateListComponent} from './certificate-list.component';
import {CertificateDetailComponent} from './certificate-detail.component';

const routes: Routes = [
  {path: '', component: CertificateListComponent},
  {path: 'new', component: CertificateAddComponent},
  {path: ':id', component: CertificateDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeysAndCertsRoutingModule {
}
