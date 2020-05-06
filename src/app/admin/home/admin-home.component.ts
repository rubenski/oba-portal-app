import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../organization.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private organizationService: OrganizationService) {
  }

  private organization: Organization;

  ngOnInit(): void {
    const organizationId = localStorage.getItem('loggedInOrganization');
    console.log('Finding organization for id ' + organizationId);
    this.organizationService.findOrganization(organizationId).subscribe(o => this.organization = o);
  }

}
