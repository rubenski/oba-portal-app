import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FinancialOrganization} from './admin/organization/financial-organizations/financial.organization';


@Injectable()
export class FOService {

  private bankServiceUrl = environment.obaPortalBackendHostName + '/banks';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<FinancialOrganization[]> {
    return this.http.get<FinancialOrganization[]>(this.bankServiceUrl);
  }

  findOne(systemName): Observable<FinancialOrganization> {
    return this.http.get<FinancialOrganization>(this.bankServiceUrl + '/' + systemName);
  }
}
