import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {KeysAndCertsRoutingModule} from './keys-and-certs.routing.module';
import {CertificateAddComponent} from './certificate-add.component';
import {CertificateListComponent} from './certificate-list.component';
import {CertificateDetailComponent} from './certificate-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    KeysAndCertsRoutingModule
  ],
  declarations: [CertificateAddComponent, CertificateListComponent, CertificateDetailComponent],
  exports: [CertificateAddComponent, CertificateListComponent, CertificateDetailComponent]
})
export class KeysAndCertsModule {
}
