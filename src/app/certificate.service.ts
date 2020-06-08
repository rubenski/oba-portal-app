import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConstants} from './app.constants';
import {CreateCertificate} from './admin/organization/keys-certs/create-certificate';
import {Certificate} from './admin/organization/keys-certs/certificate';

@Injectable()
export class CertificateService {

  private readonly certificatesUrl = environment.obaPortalBackendHostName + '/certificates';

  constructor(private http: HttpClient) {}

  findOne(id): Observable<Certificate> {
    return this.http.get<Certificate>(this.certificatesUrl + '/' + id);
  }

  findAll(nonExpiredOnly: boolean): Observable<Certificate[]> {
    console.log(this.certificatesUrl);
    return this.http.get<Certificate[]>(this.certificatesUrl + '?nonExpiredOnly=' + nonExpiredOnly);
  }

  create(certificate: CreateCertificate): Observable<CreateCertificate> {
    return this.http.post<CreateCertificate>(this.certificatesUrl, certificate, AppConstants.HTTP_OPTIONS);
  }

  delete(id): Observable<void> {
    return this.http.delete<void>(this.certificatesUrl + '/' + id, AppConstants.HTTP_OPTIONS);
  }
}
