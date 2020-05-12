import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {KeysAndCertsRoutingModule} from './keys-and-certs.routing.module';
import {CertificateComponent} from './certificate.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    KeysAndCertsRoutingModule
  ],
  declarations: [CertificateComponent],
  exports: [CertificateComponent]
})
export class KeysAndCertsModule {
}
