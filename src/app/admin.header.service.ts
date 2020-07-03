/**
 * This service lists the application's in the admin header. Because we return an observable the
 * list of application buttons will be updated automatically when a new application is added
 */
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Application} from './admin/organization/applications/application';
import {ApplicationService} from './application.service';

@Injectable()
export class AdminHeaderService {

  private applications: BehaviorSubject<Application[]> = new BehaviorSubject<Application[]>([]);

  constructor(private applicationService: ApplicationService) {
    this.updateApplications();
  }

  updateApplications() {
    return this.applicationService.findAll().subscribe(result => {
        this.applications.next(result);
      }
    );
  }

  findApplications(): Observable<Application[]> {
    return this.applications;
  }

}
