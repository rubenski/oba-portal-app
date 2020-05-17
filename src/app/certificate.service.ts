import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConstants} from './app.constants';
import {CreateCertificate} from './admin/keys-certs/create-certificate';
import {ListCertificate} from './admin/keys-certs/list-certificate';

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

  findOne(id): Observable<CreateCertificate> {
    return this.http.get<CreateCertificate>(this.certificatesUrl + id);
  }

  finalAll(): Observable<ListCertificate[]> {
    return this.http.get<ListCertificate[]>(this.certificatesUrl);
  }

  create(certificate: CreateCertificate): Observable<CreateCertificate> {
    return this.http.post<CreateCertificate>(this.certificatesUrl, certificate, AppConstants.HTTP_OPTIONS);
  }

  delete(id): Observable<void> {
    return this.http.delete<void>(this.certificatesUrl + id, AppConstants.HTTP_OPTIONS);
  }
}
