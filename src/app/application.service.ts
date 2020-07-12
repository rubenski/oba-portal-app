import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from './app.constants';
import {Application} from './admin/organization/applications/application';
import {CreateApplicationRequest} from './admin/organization/applications/create.application.request';
import {PublicKey} from './admin/applications/public-keys/public.key';
import {CreatePublicKeyRequest} from './admin/applications/public-keys/create.public.key.request';
import {FinancialOrganization} from './admin/organization/apis/financial.organization';
import {AvailableCountryDataProvider} from './admin/applications/country-data-providers/available.country.data.provider';
import {EnableCountryDataProviderRequest} from './admin/applications/country-data-providers/enableCountryDataProviderRequest';

@Injectable()
export class ApplicationService {

  private applicationsUrl = environment.obaPortalBackendHostName + '/applications';

  constructor(private http: HttpClient) {
  }

  findApplication(id): Observable<Application> {
    return this.http.get<Application>(this.applicationsUrl + '/' + id);
  }

  findAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.applicationsUrl);
  }

  deleteApplication(id): Observable<void> {
    return this.http.delete<void>(this.applicationsUrl + '/' + id);
  }

  createApplication(createApplication: CreateApplicationRequest): Observable<Application> {
    return this.http.post<Application>(this.applicationsUrl, createApplication, AppConstants.HTTP_OPTIONS);
  }

  findAllApplicationPublicKeys(applicationId): Observable<PublicKey[]> {
    return this.http.get<PublicKey[]>(this.applicationsUrl + '/' + applicationId + '/public-keys');
  }

  createApplicationPublicKeys(applicationId, createPublicKeyRequest: CreatePublicKeyRequest): Observable<PublicKey> {
    return this.http.post<PublicKey>(this.applicationsUrl + '/' + applicationId + '/public-keys', createPublicKeyRequest);
  }

  deleteApplicationPublicKey(applicationId, id): Observable<void> {
    return this.http.delete<void>(this.applicationsUrl + '/' + applicationId + '/public-keys/' + id);
  }

  findAvailableCountryDataProvidersWithEnabledProjection(applicationId): Observable<AvailableCountryDataProvider[]> {
    return this.http.get<AvailableCountryDataProvider[]>(environment.obaPortalBackendHostName + '/applications/' + applicationId + '/available-country-data-providers');
  }

  createEnabledCountryDataProvider(applicationId: string, systemName: string): Observable<void> {
    return this.http.post<void>(environment.obaPortalBackendHostName + '/applications/' + applicationId + '/enabled-country-data-providers',
      new EnableCountryDataProviderRequest(systemName));
  }

  deleteEnabledCountryDataProvider(applicationId: string, systemName: string): Observable<void> {
    return this.http.delete<void>(environment.obaPortalBackendHostName + '/applications/' + applicationId + '/enabled-country-data-providers/' + systemName);
  }
}
