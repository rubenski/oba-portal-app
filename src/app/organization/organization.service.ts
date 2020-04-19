import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable()
export class OrganizationService {

  private sessionsUrl = environment.obaPortalBackendHostName + '/organizations/';

  constructor(private http: HttpClient) {
  }

  update(organization: Organization) {}

  get(id: string) {
    return this.http.get(this.sessionsUrl + id);
  }
}
