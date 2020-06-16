import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ApiRegistration} from './api.registration';


@Component({
  templateUrl: './api-registrations-list.component.html'
})
export class ApiRegistrationsListComponent implements OnInit {

  private apiRegistrations: ApiRegistration[];

  constructor(private apiRegistrationService: ApiRegistrationService) {
  }

  ngOnInit(): void {
    this.apiRegistrationService.findRegistrationsForOrganization().subscribe(list => {
        this.apiRegistrations = list;
      },
      error => {
        console.log(error);
      });
  }


}
