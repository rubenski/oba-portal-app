import {Component, OnInit} from '@angular/core';
import {CertificateService} from '../../../certificate.service';
import {Router} from '@angular/router';
import {BankRegistration} from './bank.registration';
import {Bank} from './bank';

@Component({
  templateUrl: './bank-registrations-list.component.html'
})
export class BankRegistrationsListComponent implements OnInit {

  banks: Bank[];
  certificates: BankRegistration[];
  globalError: any;

  constructor(private certificateService: CertificateService, private router: Router) {

  }

  ngOnInit(): void {
    this.certificateService.findAll(false).subscribe(
      data => {
        this.certificates = data;
      }, error => {
        this.globalError = 'An error occurred';
      }
    );
  }
}
