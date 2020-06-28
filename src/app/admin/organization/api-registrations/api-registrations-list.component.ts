import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ApiRegistration} from './api.registration';
import {ApiService} from '../../../api.service';
import {ActivatedRoute} from '@angular/router';
import {Api} from './api';


@Component({
  templateUrl: './api-registrations-list.component.html'
})
export class ApiRegistrationsListComponent implements OnInit {

  private apiRegistrations: ApiRegistration[];
  private api: Api;
  private apiId: string;

  constructor(private apiRegistrationService: ApiRegistrationService, private apiService: ApiService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.apiId = params.apiId;
    });
  }

  ngOnInit(): void {
    this.apiService.findOne(this.apiId).subscribe(api => {
      this.api = api;
      this.apiRegistrationService.findRegistrationsForApi(this.apiId).subscribe(
        registrations => {
          this.apiRegistrations = registrations;
        }, error => {
          console.log(error);
        });
    });
  }
}
