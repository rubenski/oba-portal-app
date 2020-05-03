import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../organization.service';

@Component({
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  private organization: Organization;


  constructor(private organizationService: OrganizationService) {
  }

  ngOnInit(): void {

  }



}
