import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OrganizationService} from '../../../organization.service';
import {ApiWithCountryDataProviders} from './api.with.country.data.providers';
import {ApiService} from '../../../api.service';

@Component({
  templateUrl: './api-list.component.html'
})
export class ApiListComponent implements OnInit {

  apis: ApiWithCountryDataProviders[];

  constructor(private router: Router,
              private organizationService: OrganizationService,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.findAllApisWithCountryDataProviders().subscribe(result => {
      this.apis = result;
    });
  }
}

