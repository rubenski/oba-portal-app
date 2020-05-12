import {Component} from '@angular/core';
import {Certificate} from '../../certificate';
import {CertificateService} from '../../certificate.service';

@Component({
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent {

  certificate: Certificate = new Certificate();
  globalError: any;
  globalSuccess: any;
  purposes: any = ['', 'Signing (eIDAS QSEAL)', 'Transport (eIDAS QWAC)'];

  constructor(private certificateService: CertificateService) {
  }

  onSubmit() {
    this.certificateService.create(this.certificate).subscribe(
      o => {
        this.certificate = o;
        this.globalSuccess = 'Certificate saved';
      },
      () => {
        this.globalError = 'An error occurred';
      });
  }
}
