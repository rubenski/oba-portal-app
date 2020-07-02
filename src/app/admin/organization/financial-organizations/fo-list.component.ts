import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OrganizationService} from '../../../organization.service';
import {FinancialOrganization} from './financial.organization';
import {BankService} from '../../../banks.service';

@Component({
  templateUrl: './fo-list.component.html'
})
export class FoListComponent implements OnInit {

  financialOrganizations: FinancialOrganization[];
  globalError: any;
  isOrganizationComplete: boolean;
  render = false;

  constructor(private router: Router,
              private organizationService: OrganizationService,
              private bankService: BankService) {

  }

  ngOnInit(): void {
    this.organizationService.completenessReport().subscribe(
      report => {
        this.isOrganizationComplete = report.validSigningCertificate && report.validTransportCertificate
          && report.redirectUrl && report.organizationFieldsComplete;
        if (!this.isOrganizationComplete) {
          this.render = true;
        }
        if (this.isOrganizationComplete) {
          this.bankService.findAll().subscribe(data => {
              this.financialOrganizations = data;
              this.render = true;
            },
            error => {
              console.log(error);
            });
        }
      });
  }
}

