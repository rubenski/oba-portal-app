import {Component, OnInit} from '@angular/core';
import {UploadKeyAndCertificate} from './upload.key.and.certificate';
import {AppConstants} from '../../../app.constants';
import {CertificateService} from '../../../certificate.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './upload-certificate.component.html'
})
export class UploadCertificateComponent implements OnInit {

  globalError: any;
  uploadKeyAndCertificate = new UploadKeyAndCertificate();
  certificateLimitReached: boolean;


  constructor(private certificateService: CertificateService, private router: Router) {
  }

  onSubmit() {
    this.certificateService.createUploaded(this.uploadKeyAndCertificate).subscribe(
      () => {
        this.router.navigate(['admin/organization/keys-certs']);
      },
      () => {
        this.globalError = 'An error occurred';
      });
  }

  ngOnInit(): void {
    this.certificateService.findAll(false).subscribe(all => {
      if (all.length >= AppConstants.MAX_NUMBER_OF_CERTIFICATES) {
        this.certificateLimitReached = true;
      }
    });
  }
}
