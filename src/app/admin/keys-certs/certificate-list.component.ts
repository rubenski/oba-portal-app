import {Component, OnInit} from '@angular/core';
import {CertificateService} from '../../certificate.service';
import {Router} from '@angular/router';
import {Certificate} from './certificate';

@Component({
  templateUrl: './certificate-list.component.html'
})
export class CertificateListComponent implements OnInit {

  certificates: Certificate[];
  globalError: any;

  constructor(private certificateService: CertificateService, private router: Router) {
  }

  ngOnInit(): void {
    this.certificateService.finalAll().subscribe(
      data => {
        this.certificates = data;
      }, error => {
        this.globalError = 'An error occurred';
      }
    );
  }
}
