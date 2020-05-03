import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class OrganizationService {

  private organizationsUrl = environment.obaPortalBackendHostName + '/organizations/';

  constructor(private http: HttpClient) {
  }

  findOrganization(id: string): Observable<Organization> {
    return this.http.get<Organization>(this.organizationsUrl + id);
  }
}
