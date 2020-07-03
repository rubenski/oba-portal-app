import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../error.service';
import {LoginService} from '../../login/login.service';
import {ApplicationService} from '../../application.service';
import {Application} from '../../admin/organization/applications/application';
import {AdminHeaderService} from '../../admin.header.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  serverError: any;
  user: any;
  selectedApplication: Application;

  constructor(private router: Router, private errorService: ErrorService,
              private loginService: LoginService,
              private applicationService: ApplicationService,
              private adminHeaderService: AdminHeaderService) {

  }

  ngOnInit(): void {
    this.errorService.hasServerError().subscribe(e => this.serverError = e);
    this.loginService.getServerSession();
  }

  getServerError(): any {
    return this.errorService.getServerError();
  }

  isOrganization(): boolean {
    return this.router.url.includes('admin/organization');
  }

  isApplication(): boolean {
    return this.router.url.includes('admin/application');
  }

  selectApplication(id) {
    console.log('ID: ' + id);
    this.applicationService.findOne(id).subscribe(app => {
      this.selectedApplication = app;
    });
  }

  allApplications(): Observable<Application[]> {
    return this.adminHeaderService.findApplications();
  }
}
