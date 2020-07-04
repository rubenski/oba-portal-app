import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Application} from './application';
import {ApplicationService} from '../../../application.service';
import {AdminHeaderService} from '../../../admin.header.service';

@Component({
  templateUrl: './applications.list.component.html'
})
export class ApplicationsListComponent implements OnInit {

  applications: Application[];

  constructor(private applicationService: ApplicationService, private adminHeaderService: AdminHeaderService) {

  }

  ngOnInit(): void {
    this.applicationService.findAllApplications().subscribe(
      data => {
        this.applications = data;
      }, error => {
        console.log(error);
      }
    );
  }

  delete(id: any) {
    this.applicationService.deleteApplication(id)
      .subscribe(result => {
        this.ngOnInit();
        this.adminHeaderService.updateApplications();
      });
  }
}
