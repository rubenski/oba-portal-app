import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConstants} from './app.constants';
import {Certificate} from './certificate';

@Injectable()
export class CertificateService {

  private readonly certificatesUrl;

  constructor(private http: HttpClient) {
    const organizationId = localStorage.getItem('loggedInOrganization');
    if (!organizationId) {
      throw new Error('No logged in organization found');
    }
    this.certificatesUrl = environment.obaPortalBackendHostName + '/' + organizationId + '/certificates/';
  }

  findOne(id): Observable<Certificate> {
    return this.http.get<Certificate>(this.certificatesUrl + id);
  }

  finalAll(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.certificatesUrl);
  }

  create(certificate: Certificate): Observable<Certificate> {
    return this.http.post<Certificate>(this.certificatesUrl, certificate, AppConstants.HTTP_OPTIONS);
  }

  delete(id): Observable<void> {
    return this.http.delete<void>(this.certificatesUrl + id, AppConstants.HTTP_OPTIONS);
  }
}
