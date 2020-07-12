import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FinancialOrganization} from './admin/organization/apis/financial.organization';


@Injectable()
export class FOService {

  private foServiceUrl = environment.obaPortalBackendHostName + '/financial-organizations';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<FinancialOrganization[]> {
    return this.http.get<FinancialOrganization[]>(this.foServiceUrl);
  }

  findOne(systemName): Observable<FinancialOrganization> {
    return this.http.get<FinancialOrganization>(this.foServiceUrl + '/' + systemName);
  }

}
