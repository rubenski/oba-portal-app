import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../../organization.service';
import {Organization} from '../../../organization';

@Component({
  templateUrl: './main-info.component.html'
})
export class MainInfoComponent implements OnInit {

  organization: Organization;
  globalError: string;
  globalSuccess: string;
  countries: any = ['Belgium', 'Czech Republic', 'Denmark', 'Finland', 'Norway', 'France', 'Germany', 'Italy', 'Luxembourg', 'Netherlands', 'Poland',
    'Portugal', 'Romania', 'Spain', 'Sweden', 'Switzerland', 'United Kingdom', 'United States', 'Ukraine'];

  constructor(private organizationService: OrganizationService) {
  }

  ngOnInit() {
    this.organizationService.findLoggedInOrganization().subscribe(o => this.organization = o);
  }

  onSubmit() {

    this.organizationService.updateOrganization(this.organization).subscribe(
      o => {
        this.organization = o;
        this.globalSuccess = 'Organization info saved';
      },
      () => {
        this.globalError = 'An error occurred';
      });
  }
}
