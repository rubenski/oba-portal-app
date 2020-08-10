import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiWithCountryDataProviders} from './admin/organization/apis/api.with.country.data.providers';
import {ApiWithRegistrations} from './admin/organization/api-registrations/api.with.registrations';


@Injectable()
export class ApiService {

  private readonly apisUrl = environment.obaPortalBackendHostName + '/apis';

  constructor(private http: HttpClient) {
  }

  findOneApiWithCountryDataProvidersAndRegistrations(apiId): Observable<ApiWithRegistrations> {
    return this.http.get<ApiWithRegistrations>(this.apisUrl + '/' + apiId);
  }

  findAllApisWithCountryDataProviders(): Observable<ApiWithCountryDataProviders[]> {
    return this.http.get<ApiWithCountryDataProviders[]>(this.apisUrl);
  }
}
