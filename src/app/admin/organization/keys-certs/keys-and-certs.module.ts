import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {KeysAndCertsRoutingModule} from './keys-and-certs.routing.module';
import {GenerateNewCertificateComponent} from './generate-new-certificate.component';
import {CertificateListComponent} from './certificate-list.component';
import {CertificateDetailComponent} from './certificate-detail.component';
import {UploadCertificateComponent} from './upload-certificate.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    KeysAndCertsRoutingModule
  ],
  declarations: [GenerateNewCertificateComponent, UploadCertificateComponent, CertificateListComponent, CertificateDetailComponent],
  exports: [GenerateNewCertificateComponent, UploadCertificateComponent, CertificateListComponent, CertificateDetailComponent]
})
export class KeysAndCertsModule {
}
