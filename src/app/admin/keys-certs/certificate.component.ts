import {Component} from '@angular/core';
import {Certificate} from '../../certificate';
import {CertificateService} from '../../certificate.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent {

  certificate: Certificate = new Certificate();
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
