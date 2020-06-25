import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiRegistrationStepResult} from './admin/organization/api-registration/api.registration.step.result';
import {ApiRegistration} from './admin/organization/api-registration/api.registration';
import {ApiRegistrationSteps} from './admin/organization/api-registration/api.registration.steps';
import {FilledOutForm} from './admin/organization/api-registration/filled.out.form';
import {RegistrationStatusRequest} from './admin/organization/api-registration/registrationStatusRequest';


@Injectable()
export class ApiRegistrationService {

  private readonly stepResultsUrl = environment.obaPortalBackendHostName + '/api-registration-steps';
  private readonly registrationsUrl = environment.obaPortalBackendHostName + '/api-registrations';

  constructor(private http: HttpClient) {
  }

  findRegistrationsForApi(apiId): Observable<ApiRegistration[]> {
    return this.http.get<ApiRegistration[]>(this.registrationsUrl + '?apiId=' + apiId);
  }

  findRegistrationsForOrganization(): Observable<ApiRegistration[]> {
    return this.http.get<ApiRegistration[]>(this.registrationsUrl);
  }

  findRegistrationSteps(apiId): Observable<ApiRegistrationSteps> {
    return this.http.get<ApiRegistrationSteps>(this.stepResultsUrl + '/' + apiId);
  }

  submitRegistrationStep(form: FilledOutForm, apiId): Observable<ApiRegistrationStepResult> {
    return this.http.post<ApiRegistrationStepResult>(this.stepResultsUrl + '/' + apiId, form);
  }

  setStatus(apiRegistrationId: string, status: string): Observable<ApiRegistrationStepResult> {
    const request1 = new RegistrationStatusRequest(status);
    return this.http.patch<ApiRegistrationStepResult>(this.registrationsUrl + '/' + apiRegistrationId, request1);
  }
}
