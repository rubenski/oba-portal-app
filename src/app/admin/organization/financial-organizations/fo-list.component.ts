import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OrganizationService} from '../../../organization.service';
import {FinancialOrganization} from './financial.organization';
import {FOService} from '../../../banks.service';

@Component({
  templateUrl: './fo-list.component.html'
})
export class FoListComponent implements OnInit {

  financialOrganizations: FinancialOrganization[];
  globalError: any;
  render = false;

  constructor(private router: Router,
              private organizationService: OrganizationService,
              private bankService: FOService) {

  }

  ngOnInit(): void {
    this.bankService.findAll().subscribe(data => {
        this.financialOrganizations = data;
        this.render = true;
      },
      error => {
        console.log(error);
      });
  }
}

