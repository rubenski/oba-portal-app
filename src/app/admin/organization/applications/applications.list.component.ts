import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Application} from './application';
import {ApplicationService} from '../../../application.service';

@Component({
  templateUrl: './applications.list.component.html'
})
export class ApplicationsListComponent implements OnInit {

  applications: Application[];

  constructor(private applicationService: ApplicationService, private router: Router) {

  }

  ngOnInit(): void {
    this.applicationService.findAll().subscribe(
      data => {
        this.applications = data;
      }, error => {
        console.log(error);
      }
    );
  }
}
