import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CertificateComponent} from './certificate.component';
import {CertificateListComponent} from './certificate-list.component';

const routes: Routes = [
  {path: '', component: CertificateListComponent},
  {path: 'new', component: CertificateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeysAndCertsRoutingModule {
}
