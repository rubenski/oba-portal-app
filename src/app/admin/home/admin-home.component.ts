import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../organization.service';
import {Organization} from '../../organization';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private organizationService: OrganizationService) {
  }

  organization: Organization;

  ngOnInit(): void {
    const organizationId = localStorage.getItem('loggedInOrganization');
    console.log('Finding organization for id ' + organizationId);
    this.organizationService.findLoggedInOrganization().subscribe(o => this.organization = o);
  }

}
