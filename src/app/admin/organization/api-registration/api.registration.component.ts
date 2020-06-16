import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ActivatedRoute} from '@angular/router';
import {ApiRegistration} from './api.registration';
import {ApiRegistrationStepResult} from './api.registration.step.result';

@Component({
  templateUrl: './api-registration.component.html'
})
export class ApiRegistrationComponent implements OnInit {

  apiId: string = this.route.snapshot.paramMap.get('apiId');

  apiRegistrations: ApiRegistration[];
  apiRegistrationStepResults: ApiRegistrationStepResult[];


  constructor(private apiRegistrationService: ApiRegistrationService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.apiRegistrationService.findRegistrationsForApi(this.apiId).subscribe(registrations => {
      console.log(registrations);
      if (registrations.length === 0) {
        console.log('0 found');
        this.apiRegistrationService.findRegistrationSteps(this.apiId).subscribe(attempts => {
            this.apiRegistrationStepResults = attempts;
          },
          error => {

          });
      } else {
        this.apiRegistrations = registrations;
      }
    }, error => {
      console.log(error);
    });
  }


}
