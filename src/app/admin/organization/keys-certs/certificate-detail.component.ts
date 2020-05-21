import {Component, OnInit} from '@angular/core';
import {CertificateService} from '../../../certificate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Certificate} from './certificate';

@Component({
  templateUrl: './certificate-detail.component.html'
})
export class CertificateDetailComponent implements OnInit {

  certificate: Certificate;
  globalError: any;

  id: string = this.route.snapshot.paramMap.get('id');

  constructor(private certificateService: CertificateService, private router: Router, private route: ActivatedRoute) {
  }

  onSubmit() {

  }

  ngOnInit(): void {
    this.certificateService.findOne(this.id).subscribe(cert => {
      this.certificate = cert;
    });
  }
}
