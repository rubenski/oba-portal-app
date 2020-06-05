import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConstants} from './app.constants';
import {CreateCertificate} from './admin/organization/keys-certs/create-certificate';
import {Certificate} from './admin/organization/keys-certs/certificate';

@Injectable()
export class CertificateService {

  private readonly certificatesUrl;

  constructor(private http: HttpClient) {
    const organizationId = localStorage.getItem('loggedInOrganization');
    if (!organizationId) {
      throw new Error('No logged in organization found');
    }
    this.certificatesUrl = environment.obaPortalBackendHostName + '/certificates';
  }

  findOne(id): Observable<Certificate> {
    return this.http.get<Certificate>(this.certificatesUrl + '/' + id);
  }

  finalAll(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.certificatesUrl);
  }

  create(certificate: CreateCertificate): Observable<CreateCertificate> {
    return this.http.post<CreateCertificate>(this.certificatesUrl, certificate, AppConstants.HTTP_OPTIONS);
  }

  delete(id): Observable<void> {
    return this.http.delete<void>(this.certificatesUrl + '/' + id, AppConstants.HTTP_OPTIONS);
  }
}
