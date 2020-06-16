import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiRegistrationStepResult} from './admin/organization/api-registration/api.registration.step.result';
import {ApiRegistration} from './admin/organization/api-registration/api.registration';


@Injectable()
export class ApiRegistrationService {

  private readonly stepResultsUrl = environment.obaPortalBackendHostName + '/api-registration-steps';
  private readonly registrationsUrl = environment.obaPortalBackendHostName + '/api-registrations';

  constructor(private http: HttpClient) {
  }

  findRegistrationsForApi(apiId): Observable<ApiRegistration[]> {
    return this.http.get<ApiRegistration[]>(this.registrationsUrl + '/' + apiId);
  }

  findRegistrationsForOrganization(): Observable<ApiRegistration[]> {
    return this.http.get<ApiRegistration[]>(this.registrationsUrl);
  }

  findRegistrationSteps(apiId): Observable<ApiRegistrationStepResult[]> {
    return this.http.get<ApiRegistrationStepResult[]>(this.stepResultsUrl + '/' + apiId);
  }


}
