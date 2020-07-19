import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Organization} from './organization';
import {AppConstants} from './app.constants';
import {CompletenessReport} from './admin/home/completeness.report';

@Injectable()
export class OrganizationService {

  private organizationsUrl = environment.obaPortalBackendHostName + '/organizations/';

  constructor(private http: HttpClient) {
  }

  findLoggedInOrganization(): Observable<Organization> {
    const organizationId = localStorage.getItem('loggedInOrganization');
    if (!organizationId) {
      throw new Error('No logged in organization found');
    }
    return this.http.get<Organization>(this.organizationsUrl + organizationId);
  }

  updateOrganization(updatedOrganization: Organization): Observable<Organization> {
    updatedOrganization.id = localStorage.getItem('loggedInOrganization');
    return this.http.put<Organization>(this.organizationsUrl, updatedOrganization, AppConstants.HTTP_OPTIONS);
  }

  completenessReport(): Observable<CompletenessReport> {
    return this.http.get<CompletenessReport>(this.organizationsUrl + 'completeness-report');
  }
}
