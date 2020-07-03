import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppConstants} from '../../../app.constants';
import {CreateApplicationRequest} from './create.application.request';
import {ApplicationService} from '../../../application.service';
import {AdminHeaderService} from '../../../admin.header.service';

@Component({
  templateUrl: './create.application.component.html'
})
export class CreateApplicationComponent implements OnInit {

  application: CreateApplicationRequest = new CreateApplicationRequest();
  globalError: any;
  applicationLimitReached = false;

  constructor(private applicationService: ApplicationService, private router: Router, private adminHeaderService: AdminHeaderService) {
  }

  onSubmit() {
    this.applicationService.createApplication(this.application).subscribe(
      a => {
        this.application = a;
        this.adminHeaderService.updateApplications();
        this.router.navigate(['admin/organization/applications']);
      },
      () => {
        this.globalError = 'An error occurred';
      });
  }

  ngOnInit(): void {
    this.applicationService.findAllApplications().subscribe(all => {
      if (all.length >= AppConstants.MAX_NUMBER_OF_APPLICATIONS) {
        this.applicationLimitReached = true;
      }
    });
  }
}
