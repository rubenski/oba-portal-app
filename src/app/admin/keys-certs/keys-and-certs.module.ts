import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {KeysAndCertsRoutingModule} from './keys-and-certs.routing.module';
import {CertificateComponent} from './certificate.component';
import {CertificateListComponent} from './certificate-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    KeysAndCertsRoutingModule
  ],
  declarations: [CertificateComponent, CertificateListComponent],
  exports: [CertificateComponent, CertificateListComponent]
})
export class KeysAndCertsModule {
}
