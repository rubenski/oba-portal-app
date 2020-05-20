import {Component, OnInit} from '@angular/core';
import {CreateCertificate} from './create-certificate';
import {CertificateService} from '../../certificate.service';
import {Router} from '@angular/router';
import {AppConstants} from '../../app.constants';

@Component({
  templateUrl: './certificate-add.component.html',
  styleUrls: ['./certificate-add.component.css']
})
export class CertificateAddComponent implements OnInit {

  certificate: CreateCertificate = new CreateCertificate();
  globalError: any;
  certificateLimitReached = false;

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

  ngOnInit(): void {

    this.certificateService.finalAll().subscribe(all => {
      if (all.length >= AppConstants.MAX_NUMBER_OF_CERTIFICATES) {
        this.certificateLimitReached = true;
      }
    });
  }
}
