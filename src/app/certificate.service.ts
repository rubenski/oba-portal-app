import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConstants} from './app.constants';
import {CreateCertificate} from './admin/organization/keys-certs/create-certificate';
import {Certificate} from './admin/organization/keys-certs/certificate';
import {UploadKeyAndCertificate} from './admin/organization/keys-certs/upload.key.and.certificate';

@Injectable()
export class CertificateService {

  private readonly certificatesUrl = environment.obaPortalBackendHostName + '/certificates';
  private readonly generatedCertificatesUrl = environment.obaPortalBackendHostName + '/generated-certificates';
  private readonly uploadedCertificatesUrl = environment.obaPortalBackendHostName + '/uploaded-certificates';

  constructor(private http: HttpClient) {
  }

  findOne(id): Observable<Certificate> {
    return this.http.get<Certificate>(this.certificatesUrl + '/' + id);
  }

  findAll(nonExpiredOnly: boolean): Observable<Certificate[]> {
    console.log(this.certificatesUrl);
    return this.http.get<Certificate[]>(this.certificatesUrl + '?nonExpiredOnly=' + nonExpiredOnly);
  }

  createGenerated(certificate: CreateCertificate): Observable<CreateCertificate> {
    return this.http.post<CreateCertificate>(this.generatedCertificatesUrl, certificate, AppConstants.HTTP_OPTIONS);
  }

  createUploaded(certificate: UploadKeyAndCertificate): Observable<CreateCertificate> {
    return this.http.post<CreateCertificate>(this.uploadedCertificatesUrl, certificate, AppConstants.HTTP_OPTIONS);
  }

  delete(id): Observable<void> {
    return this.http.delete<void>(this.certificatesUrl + '/' + id, AppConstants.HTTP_OPTIONS);
  }
}
