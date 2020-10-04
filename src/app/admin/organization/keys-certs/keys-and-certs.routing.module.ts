import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GenerateNewCertificateComponent} from './generate-new-certificate.component';
import {CertificateListComponent} from './certificate-list.component';
import {CertificateDetailComponent} from './certificate-detail.component';
import {UploadCertificateComponent} from './upload-certificate.component';

const routes: Routes = [
  {path: '', component: CertificateListComponent},
  {path: 'create', component: GenerateNewCertificateComponent},
  {path: 'upload', component: UploadCertificateComponent},
  {path: ':id', component: CertificateDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeysAndCertsRoutingModule {
}
