import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {OrganizationService} from '../../../organization.service';
import {FinancialOrganization} from './financial.organization';
import {FOService} from '../../../fo-service';

@Component({
  templateUrl: './apis.component.html'
})
export class FoDetailComponent implements OnInit {

  bank: FinancialOrganization;
  globalError: any;
  systemName: string = this.route.snapshot.paramMap.get('systemName');

  constructor(private router: Router,
              private organizationService: OrganizationService,
              private foService: FOService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.foService.findOne(this.systemName).subscribe(data => {
        this.bank = data;
      },
      error => {
        console.log(error);
      });
  }
}

