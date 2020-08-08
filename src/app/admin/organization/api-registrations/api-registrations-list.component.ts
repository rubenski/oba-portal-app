import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiWithCountryDataProviders} from '../apis/api.with.country.data.providers';


@Component({
  templateUrl: './api-registrations-list.component.html'
})
export class ApiRegistrationsListComponent implements OnInit {

  public apiWithDataProviders: ApiWithCountryDataProviders;
  private apiId: string;

  constructor(private apiRegistrationService: ApiRegistrationService,
              private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.apiId = params.apiId;
    });
  }

  ngOnInit(): void {
    this.apiService.findOneApiWithCountryDataProvidersAndRegistrations(this.apiId).subscribe(result => {
        this.apiWithDataProviders = result;
      }
    );
  }

  setEnabled(apiRegistrationId: any, currentState: boolean) {
    // If the registration is already enabled, we do nothing.
    if (currentState) {
      return;
    }
    this.apiRegistrationService.enableRegistration(apiRegistrationId).subscribe(result => {
      this.ngOnInit();
    });
  }
}
