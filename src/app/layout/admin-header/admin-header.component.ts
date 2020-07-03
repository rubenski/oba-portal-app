import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
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
              private adminHeaderService: AdminHeaderService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.selectedApplication);
    console.log(this.isApplication());
    console.log('id ' + JSON.stringify(this.route.params));

    this.route.params.subscribe(parameter => {
      console.log('param: ' + JSON.stringify(parameter));
    });

    this.adminHeaderService.subscribeToApplicationChanges().subscribe(app => {
      this.selectedApplication = app;
    });

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
    return this.router.url.includes('admin/applications');
  }

  selectApplication(id) {
    console.log('ID: ' + id);
    this.applicationService.findApplication(id).subscribe(result => {
      this.selectedApplication = result;
    });
  }

  allApplications(): Observable<Application[]> {
    return this.adminHeaderService.findApplications();
  }
}
