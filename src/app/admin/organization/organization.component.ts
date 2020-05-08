import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../organization.service';
import {Organization} from '../../organization';

@Component({
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

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
        this.globalSuccess = 'Organization saved';
      },
      () => {
        this.globalError = 'An error occurred';
      });
  }
}
