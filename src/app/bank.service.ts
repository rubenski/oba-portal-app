import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Certificate} from './admin/organization/keys-certs/certificate';


export class BankService {

/*  private readonly organizationId;
  private readonly bankServiceUrl = environment.obaPortalBackendHostName + '/certificates';

  constructor(private http: HttpClient) {
    this.organizationId = localStorage.getItem('loggedInOrganization');
    if (!this.organizationId) {
      throw new Error('No logged in organization found');
    }
  }

  findalAll(nonExpired): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.bankServiceUrl + nonExpired ? 'nonExpired' : '');
  }*/

}
