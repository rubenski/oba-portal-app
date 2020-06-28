import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiRegistrationStepResult} from './admin/organization/api-registrations/api.registration.step.result';
import {ApiRegistration} from './admin/organization/api-registrations/api.registration';
import {ApiRegistrationSteps} from './admin/organization/api-registrations/api.registration.steps';
import {FilledOutForm} from './admin/organization/api-registrations/filled.out.form';
import {RegistrationUpdateStatusRequest} from './admin/organization/api-registrations/registration.update.status.request';
import {ApiRegistrationStepDefinition} from './admin/organization/api-registrations/api.registration.step.definition';


@Injectable()
export class ApiRegistrationService {

  private readonly stepResultsUrl = environment.obaPortalBackendHostName + '/api-registration-steps';
  private readonly registrationsUrl = environment.obaPortalBackendHostName + '/api-registrations';
  private readonly registrationUpdateUrl = environment.obaPortalBackendHostName + '/api-registration-update-step';

  constructor(private http: HttpClient) {
  }

  findRegistrationsForApi(apiId): Observable<ApiRegistration[]> {
    return this.http.get<ApiRegistration[]>(this.registrationsUrl + '?apiId=' + apiId);
  }

  findRegistration(registrationId): Observable<ApiRegistration> {
    return this.http.get<ApiRegistration>(this.registrationsUrl + '/' + registrationId);
  }

  findRegistrationsForOrganization(): Observable<ApiRegistration[]> {
    return this.http.get<ApiRegistration[]>(this.registrationsUrl);
  }

  findRegistrationSteps(apiId: string): Observable<ApiRegistrationSteps> {
    return this.http.get<ApiRegistrationSteps>(this.stepResultsUrl + '/' + apiId);
  }

  submitRegistrationStep(form: FilledOutForm, apiId): Observable<ApiRegistrationStepResult> {
    return this.http.post<ApiRegistrationStepResult>(this.stepResultsUrl + '/' + apiId, form);
  }

  findUpdateRegistrationStep(registrationId: string): Observable<ApiRegistrationStepDefinition> {
    return this.http.get<ApiRegistrationStepDefinition>(this.registrationUpdateUrl + '/' + registrationId);
  }

  setStatus(apiRegistrationId: string, status: string): Observable<ApiRegistrationStepResult> {
    const request1 = new RegistrationUpdateStatusRequest(status);
    return this.http.patch<ApiRegistrationStepResult>(this.registrationsUrl + '/' + apiRegistrationId, request1);
  }
}
