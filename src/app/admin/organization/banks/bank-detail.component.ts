import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {OrganizationService} from '../../../organization.service';
import {FinancialOrganization} from './financial.organization';
import {BankService} from '../../../banks.service';

@Component({
  templateUrl: './bank-detail.component.html'
})
export class BankDetailComponent implements OnInit {

  bank: FinancialOrganization;
  globalError: any;
  systemName: string = this.route.snapshot.paramMap.get('systemName');

  constructor(private router: Router,
              private organizationService: OrganizationService,
              private bankService: BankService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.bankService.findOne(this.systemName).subscribe(data => {
        this.bank = data;
      },
      error => {
        console.log(error);
      });
  }
}

