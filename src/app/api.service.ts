import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiWithCountryDataProviders} from './admin/organization/apis/api.with.country.data.providers';


@Injectable()
export class ApiService {

  private readonly apisUrl = environment.obaPortalBackendHostName + '/apis';

  constructor(private http: HttpClient) {
  }

  findOneApiWithCountryDataProvidersAndRegistrations(apiId): Observable<ApiWithCountryDataProviders> {
    return this.http.get<ApiWithCountryDataProviders>(this.apisUrl + '/' + apiId);
  }

  findAllApisWithCountryDataProviders(): Observable<ApiWithCountryDataProviders[]> {
    return this.http.get<ApiWithCountryDataProviders[]>(this.apisUrl);
  }


}
