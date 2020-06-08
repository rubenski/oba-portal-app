import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../organization.service';
import {Organization} from '../../organization';
import {CompletenessReport} from './completeness.report';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private organizationService: OrganizationService) {
  }

  organization: Organization;
  completenessReport: CompletenessReport;

  ngOnInit(): void {

    this.organizationService.findLoggedInOrganization().subscribe(
      data => this.organization = data,
      error => console.log(error)
    );

    this.organizationService.completenessReport().subscribe(
      data => this.completenessReport = data,
      error => console.log(error)
    );
  }

  isComplete() {
    return this.completenessReport.organizationFieldsComplete && this.completenessReport.redirectUrl
      && this.completenessReport.validSigningCertificate && this.completenessReport.validTransportCertificate;
  }
}
