import {Component} from '@angular/core';
import {CreateCertificate} from './create-certificate';
import {CertificateService} from '../../certificate.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent {

  certificate: CreateCertificate = new CreateCertificate();
  globalError: any;

  constructor(private certificateService: CertificateService, private router: Router) {
  }

  onSubmit() {
    this.certificateService.create(this.certificate).subscribe(
      o => {
        this.certificate = o;
        this.router.navigate(['admin/keys-certs']);
      },
      () => {
        this.globalError = 'An error occurred';
      });
  }
}
