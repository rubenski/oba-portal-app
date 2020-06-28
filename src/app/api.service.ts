import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Api} from './admin/organization/api-registrations/api';


@Injectable()
export class ApiService {

  private readonly apisUrl = environment.obaPortalBackendHostName + '/apis';

  constructor(private http: HttpClient) {
  }

  findOne(apiId): Observable<Api> {
    return this.http.get<Api>(this.apisUrl + '/' + apiId);
  }
}
