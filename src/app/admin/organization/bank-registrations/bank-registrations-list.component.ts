import {Component, OnInit} from '@angular/core';
import {CertificateService} from '../../../certificate.service';
import {Router} from '@angular/router';
import {BankRegistration} from './bank.registration';

@Component({
  templateUrl: './bank-registrations-list.component.html'
})
export class BankRegistrationsListComponent implements OnInit {

  certificates: BankRegistration[];
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
